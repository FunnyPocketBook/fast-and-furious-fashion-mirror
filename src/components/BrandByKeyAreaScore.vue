<template>
    <div>
        <svg ref="svgRef"></svg>
    </div>
</template>
  
<script setup>
import * as d3 from 'd3';
import {computed, nextTick, onMounted, ref, watch, watchEffect} from "vue";
import {getDetailScoreOfKeyAreas} from "../utils/data";
import {selectedBrand} from "../store/brand-store";

const brands = selectedBrand
const year = ref("2023")
const data = computed(() => getDetailScoreOfKeyAreas(brands.value, year.value))

const colors = ['#33B1FF', '#8A3FFC', '#0D8289', '#FF7EB6', '#FA4D56']
const keyAreas = ['Governance', 'Policies', 'Traceability', 'Know, Show, & Fix', 'Spotlight Issues']
const svgRef = ref(null)
const drawChart = () => {
    const margin = { top: 30, right: 20, bottom: 30, left: 40 };
    const width = 580 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.value)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
            .domain([0, 50]) // Assuming score is out of 50
            .range([0, width]);

    const y = d3.scaleBand()
            .domain(data.value.map(d => d.brand))
            .range([0, height])
            .padding(0.35);

    const color = d3.scaleOrdinal()
            .domain(keyAreas)
            .range(colors);

    // Stack the data
    const stackedData = d3.stack()
            .keys(keyAreas)
            (data.value);

    // Create groups for each series
    const barGroups = svg.selectAll('g.layer')
            .data(stackedData, d => d.key)
            .enter().append('g')
            .classed('layer', true)
            .attr('fill', d => color(d.key));

    // Create bars
    barGroups.selectAll('rect')
            .data(d => d)
            .enter().append('rect')
            .attr('y', d => y(d.data.brand))
            // todo, change the temporary / 4
            .attr('x', d => x(d[0]) / 4)
            .attr('width', d => x(d[1]) / 4 - x(d[0]) / 4)
            .attr('height', y.bandwidth());

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
            .attr('transform', `translate(0,${height + margin.bottom - 10})`) // Position the legend below the chart
            .selectAll('g')
            .data(color.domain())
            .enter().append('g')
            .attr('transform', (d, i) => `translate(${legendLength[i]}, 0)`); // Position each legend item

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

onMounted(drawChart)
watch(brands, async () => {
    svgRef.value.innerHTML = ''
    await nextTick()
    drawChart()
})
</script>
  
<style scoped></style>
  