<template>
    <div>
        Scores By Key Area
        <svg ref="svg"></svg>
    </div>
</template>
  
<script>
import * as d3 from 'd3';

export default {
    name: 'StackedBarChart',
    data() {
        return {
            // Dummy Data 
            data: [
                { brand: 'Zara', Governance: 20, Policies: 10, Traceability: 30, 'Know, Show, & Fix': 10, 'Spotlight Issues': 30 },
                { brand: 'H&M', Governance: 25, Policies: 20, Traceability: 15, 'Know, Show, & Fix': 20, 'Spotlight Issues': 20 },
                { brand: 'Nike', Governance: 30, Policies: 30, Traceability: 10, 'Know, Show, & Fix': 15, 'Spotlight Issues': 15 },
            ],
            colors: ['#7b1fa2', '#1e88e5', '#c2185b', '#ffc107', '#e91e63'],
            keyAreas: ['Governance', 'Policies', 'Traceability', 'Know, Show, & Fix', 'Spotlight Issues'],
        };
    },
    mounted() {
        this.drawChart();
    },
    methods: {
        drawChart() {
            const margin = { top: 30, right: 20, bottom: 30, left: 40 };
            const width = 500 - margin.left - margin.right;
            const height = 250 - margin.top - margin.bottom;

            const svg = d3.select(this.$refs.svg)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const x = d3.scaleLinear()
                .domain([0, 50]) // Assuming score is out of 50
                .range([0, width]);

            const y = d3.scaleBand()
                .domain(this.data.map(d => d.brand))
                .range([0, height])
                .padding(0.1);

            const color = d3.scaleOrdinal()
                .domain(this.keyAreas)
                .range(this.colors);

            // Stack the data
            const stackedData = d3.stack()
                .keys(this.keyAreas)
                (this.data);

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
                .attr('x', d => x(d[0]))
                .attr('width', d => x(d[1]) - x(d[0]))
                .attr('height', y.bandwidth());

            // Add the X Axis
            svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append('g')
                .call(d3.axisLeft(y));

            // Draw legend
            const legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(0,${height + margin.bottom - 10})`) // Position the legend below the chart
                .selectAll('g')
                .data(color.domain())
                .enter().append('g')
                .attr('transform', (d, i) => `translate(${i * 120}, 0)`); // Position each legend item

            legend.append('rect')
                .attr('x', 0)
                .attr('width', 18)
                .attr('height', 18)
                .attr('fill', color);

            legend.append('text')
                .attr('x', 24) // Position text to the right of the rectangle
                .attr('y', 9)
                .attr('dy', '0.35em')
                .style('fill', 'white') // Set the text color to white
                .text(d => d);

            const svgNode = this.$refs.svg;
            svgNode.style.height = height + margin.top + margin.bottom + 50 + 'px';
        }
    }
};
</script>
  
<style scoped></style>
  