<template>
    <div>
        <div class="slider-container">
            <div class="title">CHANGE YEAR: </div>
            <v-slider :ticks="years" :max="6" v-model="year" step="1" show-ticks="always" tick-size="4" color="#4a4a4a"
                track-color="#888888" :thumb-label="true" thumb-color="#aaaaaa">
                <template v-slot:thumb-label="{ modelValue }">
                    {{ modelValue + 2017 }}
                </template>
            </v-slider>
        </div>
        <svg ref="svgRef"></svg>
    </div>
</template>
  
<script setup>
import * as d3 from 'd3';
import { computed, nextTick, onMounted, ref, watch, watchEffect } from "vue";
import { getDetailScoreOfKeyAreas, getMaxPossible } from "../utils/data";
import { selectedBrand, selectedYear } from "../store/brand-store";
import {
    interactionFromVis1,
    interactionFromVis2,
    interactionFromVis3, resetInteractionFromVis1,
    resetInteractionFromVis2
} from "../store/interaction-store";

const maxPossible = getMaxPossible()
const normalizeDivisor = maxPossible.total / 100
const brands = selectedBrand

const year = ref(6)
watch(year, () => {
    const target = year.value + 2017 + ''
    if (selectedYear.value !== target)
        selectedYear.value = target
})

watch(selectedYear, () => {
    const target = Number(selectedYear.value) - 2017
    if (year.value !== target)
        year.value = target
})

const hoveringLegendLabel = ref('')

const years = {
    0: '2017',
    1: '2018',
    2: '2019',
    3: '2020',
    4: '2021',
    5: '2022',
    6: '2023'
}
const data = computed(() => {
    return getDetailScoreOfKeyAreas(brands.value)
        .map(item => ({
            ...item,
            scores: undefined,
            ...item.scores[year.value] // tired... it works at least...
        }))
})

const colors = computed(() => {
    let result = ['#33B1FF', '#8A3FFC', '#0D8289', '#FF7EB6', '#FA4D56']
    let index = keyAreas.indexOf(
            interactionFromVis3.hoveringAspect ||
            hoveringLegendLabel.value
    )

    if (index !== -1) {
        result = result.map(((c, i) => c + (i !== index ? '70' : '')))
    }
    return result
})
const keyAreas = ['Governance', 'Policies', 'Traceability', 'Know, Show, & Fix', 'Spotlight Issues']

const svgRef = ref(null)
const drawChart = () => {
    const margin = { top: 30, right: 20, bottom: 30, left: 50 };
    const width = 580 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.value)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .on('mouseleave', () => {
            resetInteractionFromVis2()
            hoveringLegendLabel.value = ''
        })

    // Add the Y Axis label "BRAND NAME"
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left - 5)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('fill', 'white')
        .text('BRAND NAME');

    // Add the X Axis label "FINAL SCORE"
    svg.append('text')
        .attr('transform', `translate(${width / 2}, ${height + margin.bottom + 10})`)
        .style('text-anchor', 'middle')
        .style('fill', 'white')
        .text('FINAL SCORE');

    const x = d3.scaleLinear()
        .domain([0, 100]) // Assuming score is out of 50
        .range([0, width])

    const y = d3.scaleBand()
        .domain(data.value.map(d => d.brand))
        .range([0, height])
        .padding(0.35);

    // Draw gridlines
    const makeXGridlines = () => d3.axisBottom(x).ticks(10);
    const makeYGridlines = () => d3.axisLeft(y).ticks(5);

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

    const color = d3.scaleOrdinal()
        .domain(keyAreas)
        .range(colors.value);

    // Stack the data
    const stackedData = d3.stack()
        .keys(keyAreas)
        (data.value);

    // Create groups for each series
    const barGroups = svg.selectAll('g.layer')
        .data(stackedData, d => d.key)
        .enter().append('g')
        .classed('layer', true)
        .attr('fill', d => color(d.key))
            .on('mouseenter', (_, data) => {
                interactionFromVis2.hoveringAspect = data.key
                resetInteractionFromVis1()
            })
            .on('mouseleave', resetInteractionFromVis2)

    // Create bars
    barGroups.selectAll('rect')
        .data(d => d)
        .enter().append('rect')
        .attr('y', d => y(d.data.brand))
        .attr('x', d => x(d[0]) / normalizeDivisor)
        .style('opacity', d => {
            if (interactionFromVis1.hoveringBrand && interactionFromVis1.hoveringBrand !== d.data.brand) return .5
            if (interactionFromVis2.hoveringBrand && interactionFromVis2.hoveringBrand !== d.data.brand) return .6
            return 1
        })
        .attr('width', d => x(d[1]) / normalizeDivisor - x(d[0]) / normalizeDivisor)
        .attr('height', y.bandwidth())
        .on('mouseenter', (_, data) => {
            interactionFromVis2.hoveringBrand = data.data.brand
            resetInteractionFromVis1()
        })
        .on('mouseleave', resetInteractionFromVis2)

    // Add the X Axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append('g')
        .call(d3.axisLeft(y));


    const legendLength = [0, 100, 180, 280, 410]
    // Draw legend
    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${i * 77},${height + margin.bottom / 2 + 20})`) // Position the legend below the chart
        .selectAll('g')
        .data(color.domain())
        .enter().append('g')
        .attr('transform', (d, i) => `translate(${legendLength[i]}, 0)`) // Position each legend item
            .on('mouseenter', ((_, label) => {
                hoveringLegendLabel.value = label
                interactionFromVis2.hoveringAspect = label
                resetInteractionFromVis1()
            }))
            .on('mouseleave', ((_, label) => {
                hoveringLegendLabel.value = ''
                interactionFromVis2.hoveringAspect = label = ''
            }))

    legend.append('circle')
        .attr('cx', 0)
        .attr('cy', 28)
        .attr('r', 4)
        .attr('fill', color);

    legend.append('text')
        .attr('x', 12) // Position text to the right of the rectangle
        .attr('y', 12)
        .attr('dy', 20)
        .style('font-size', '12px')
        .style('fill', 'white') // Set the text color to white
        .text(d => d);

    svgRef.value.style.height = height + margin.top + margin.bottom + 50 + 'px';
}
const redraw = async () => {
    svgRef.value.innerHTML = ''
    await nextTick()
    drawChart()
}

onMounted(drawChart)
watch([brands, colors, selectedYear, interactionFromVis1, interactionFromVis2], redraw)
</script>
  
<style scoped>
.slider-container {
    display: grid;
    align-items: center;
    grid-template-columns: 150px 1fr;
    margin-bottom: -24px;

    .title {
        margin-bottom: 20px
    }
}
</style>
  