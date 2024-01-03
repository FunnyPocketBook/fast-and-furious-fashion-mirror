<template>
    <p>DO YOU <em>REALLY</em> KNOW WHAT IS IN YOUR CLOSET?</p>
    <div>
        <div class="tabs">
            <button v-for="item in tabs" :key="item.title" class="tab" :class="{ active: selectedTab === item.title }"
                @click="selectTab(item.title)">
                <img :src="item.imageUrl" :alt="item.title" class="tab-image">
            </button>
        </div>
        <div class="chart" ref="chart"></div>
    </div>
</template>
  
<script>
//   import * as d3 from 'd3';
import tabOneSvg from '../assets/tab-1.svg'
import tabTwoSvg from '../assets/tab-2.svg'

export default {
    data() {
        return {
            tabs: [{ title: "Energy consumption", imageUrl: tabOneSvg }, { title: "Million metric tons in landfills", imageUrl: tabTwoSvg }],
            yAxis: ['Cotton', 'Polyester', 'Acrylic'],
            xAxis: [],
            selectedTab: 'Cotton',
        };
    },
    methods: {
        createChart() {
        },
        selectTab(tab) {
            this.selectedTab = tab;
            // Update the chart based on the selected tab
            this.updateChart();
        },
        updateChart() {
        },
    },
    mounted() {
        this.createChart();
    },
};
</script>
  
<style scoped>
.tabs {
}

.tab {
  background: none;
  border: none;
}

.tab.active {
}

.tab-image {
}
</style>
  