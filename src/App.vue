<template>
  <v-app>
    <NavBar />
    <div class="main-content">
      <router-view />
    </div>
  </v-app>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
</script>

<style scoped lang="less">
</style>
