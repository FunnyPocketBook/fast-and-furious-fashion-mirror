<template>
  <div class="app-container">
    <BannerSection />
    <HorizontalLine />
    <!-- Section 1: Energy Consumption -->
    <ClosetChart />
    <HorizontalLine />
    <!-- Section 2: ... -->
    <!-- Section 3: ... -->
  </div>
</template>

<script>
import HorizontalLine from './components/HorizontalLine.vue';
import BannerSection from './components/BannerSection.vue'
import ClosetChart from './components/ClosetChart.vue'

export default {
  name: 'App',
  components: {
    HorizontalLine,
    BannerSection,
    ClosetChart
  }
}
</script>

<style>
#app {
  font-family: Roboto Mono, Figma Hand, Avenir, Helvetica, Arial, sans-serif;
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
