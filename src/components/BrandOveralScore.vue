<template>
    <div>
        <svg ref="svgRef"></svg>
    </div>
</template>
  
<script setup>
import * as d3 from 'd3';
import {computed, onMounted, ref} from "vue";
import {colorPatternForLines} from "../utils/color";
import {getDetailScoreOfKeyAreas, getMaxPossible, getSumOfBrand} from "../utils/data";
import {selectedBrand} from "../store/brand-store";

const svgRef = ref(null)
const colors = colorPatternForLines

const maxPossible = getMaxPossible()
const dataset = computed(() => {
    return getDetailScoreOfKeyAreas(selectedBrand.value).map((dataPerBrand, i) => ({
        label: dataPerBrand.brand,
        color: colors[i],
        values: dataPerBrand.scores.map(item => ({
            x: +new Date(item.year + '-01-01'),
            y: 100 * getSumOfBrand(item) / maxPossible.total
        }))
    }))
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
            .attr('transform', `translate(${margin.left},${margin.top})`);

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
                .attr('d', line);
    });

    // Draw legend
    const legend = svg.selectAll('.legend')
            .data(dataset.value)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => `translate(0,${height + margin.bottom / 2 + i * 20})`);

    legend.append('rect')
            .attr('x', width - 20)
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', d => d.color);

    legend.append('text')
            .attr('x', width - 24)
            .attr('y', 9)
            .attr('dy', '.35em')
            .style('text-anchor', 'end')
            .text(d => d.label);
}

onMounted(draw)
</script>
  
<style scoped></style>
  