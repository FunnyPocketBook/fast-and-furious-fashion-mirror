<template>
    <div>
        Scores By Key Area
        <svg ref="svg"></svg>
    </div>
</template>
  
<script>
import * as d3 from 'd3';

export default {
    name: 'LineChart',
    data() {
        return {
            dataset: [
                { label: 'Data 1', color: 'blue', values: [{ x: 0, y: 10 }, { x: 10, y: 20 }, { x: 20, y: 30 }, { x: 30, y: 40 }] },
                { label: 'Data 2', color: 'orange', values: [{ x: 0, y: 20 }, { x: 10, y: 30 }, { x: 20, y: 40 }, { x: 30, y: 50 }] },
            ]
        };
    },
    mounted() {
        this.createLineChart();
    },
    methods: {
        createLineChart() {
            const margin = { top: 30, right: 20, bottom: 70, left: 50 },
                width = 500 - margin.left - margin.right,
                height = 200 - margin.top - margin.bottom;

            const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
            const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

            const svg = d3.select(this.$refs.svg)
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

            this.dataset.forEach(series => {
                svg.append('path')
                    .datum(series.values)
                    .attr('fill', 'none')
                    .attr('stroke', series.color)
                    .attr('stroke-width', 1.5)
                    .attr('d', line);
            });

            // Draw legend
            const legend = svg.selectAll('.legend')
                .data(this.dataset)
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
    }
};

</script>
  
<style scoped></style>
  