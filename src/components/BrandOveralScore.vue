<template>
    <div>
        <svg ref="svgRef"></svg>
    </div>
</template>
  
<script setup>
import * as d3 from 'd3';
import {computed, nextTick, onMounted, ref, watch, watchEffect} from "vue";
import { colorPatternForLines } from "../utils/color";
import { getDetailScoreOfKeyAreas, getMaxPossible, getSumOfBrand } from "../utils/data";
import {selectedBrand, selectedYear} from "../store/brand-store";
import {interactionFromVis1, interactionFromVis2, resetInteractionFromVis1} from "../store/interaction-store";

const svgRef = ref(null)
const highlightedBrand = ref('')

const maxPossible = getMaxPossible()

const colors = colorPatternForLines

const dataset = computed(() => {
    return getDetailScoreOfKeyAreas(selectedBrand.value).map((dataPerBrand, i) => {
        let color = colors[i]
        if (highlightedBrand.value && (highlightedBrand.value !== dataPerBrand.brand)) {
            color = color + '70'
        }
        return ({
            label: dataPerBrand.brand,
            color,
            values: dataPerBrand.scores.map(item => ({
                x: +new Date(item.year + '-01-01'),
                y: 100 * getSumOfBrand(item) / maxPossible.total
            }))
        });
    })
})


const draw = () => {
    const margin = { top: 30, right: 20, bottom: 70, left: 50 },
        width = 580 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

    const xScale = d3.scaleUtc()
        .domain([new Date("2016-08-01"), new Date("2023-07-01")])
        .range([0, width]);

    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const svg = d3.select(svgRef.value)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .on('mouseleave', () => {
            highlightedBrand.value = ''
            resetInteractionFromVis1()
        })

    // Draw gridlines
    const makeXGridlines = () => d3.axisBottom(xScale).ticks(5);
    const makeYGridlines = () => d3.axisLeft(yScale).ticks(5);

    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${height})`)
        .call(makeXGridlines()
            .tickSize(-height)
            .tickFormat('')
        )
        .selectAll("line")
        .attr("stroke-dasharray", "5,5");

    svg.append('g')
        .attr('class', 'grid')
        .call(makeYGridlines()
            .tickSize(-width)
            .tickFormat('')
        )
        .selectAll("line")
        .attr("stroke-dasharray", "5,5");

    // Add the Y Axis label "FINAL SCORE"
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left - 5)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('fill', 'white')
        .text('FINAL SCORE');

    // Add the X Axis label "YEARS"
    svg.append('text')
        .attr('transform', `translate(${width / 2}, ${height + margin.bottom - 25})`)
        .style('text-anchor', 'middle')
        .style('fill', 'white')
        .text('YEARS');


    const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    svg.append('g')
        .call(d3.axisLeft(yScale));

    dataset.value.forEach(series => {
        svg.append('path')
            .datum(series.values)
            .attr('fill', 'none')
            .attr('stroke', series.color)
            .attr('stroke-width', 3)
            .attr('d', line)
    });

    // for wider range of hover
    dataset.value.forEach(series => {
        svg.append('path')
            .datum(series.values)
            .attr('fill', 'none')
            .attr('stroke', () =>
                    (series.label === highlightedBrand.value)
                            ? 'rgba(255,255,255,0.1)'
                            : 'rgba(255,255,255,0)')
            .attr('stroke-width', 20)
            .attr('d', line)
            .on('mouseenter', () => {
                highlightedBrand.value = series.label
                interactionFromVis1.hoveringBrand = series.label
            })
            .on('mouseleave', () => {
                highlightedBrand.value = ''
                resetInteractionFromVis1()
            })
    });

    // Draw legend
    const legend = svg.selectAll('.legend')
        .data(dataset.value)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${i * 77},${height + margin.bottom / 2 + 20})`)
        .on('mouseenter', (_, data) => {
            highlightedBrand.value = data.label
        })
        .on('mouseleave', () => {
            highlightedBrand.value = ''
        })

    legend.append('circle')
        .attr('cx', -16)
        .attr('cy', 8)
        .attr('r', 4)
        .style('fill', d => d.color);

    legend.append('text')
        .attr('x', -2)
        .attr('y', 9)
        .attr('dy', '.35em')
        .style('font-size', '14px')
        .style('fill', 'white')
        .text(d => d.label);
}

const redraw = async () => {
    svgRef.value.innerHTML = ''
    await nextTick()
    draw()
}

onMounted(draw)
watch([selectedBrand, selectedYear, dataset, interactionFromVis2], redraw)
watch(interactionFromVis2, () => {
    highlightedBrand.value = interactionFromVis2.hoveringBrand
})
</script>
<style>
.grid line {
    stroke: #666666;
    stroke-dasharray: 5, 5;
    shape-rendering: crispEdges;
}

.grid path {
    stroke-width: 0;
}
</style>


  