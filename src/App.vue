<template>
  <v-app>
    <Navbar />
    <div class="main-content">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  }
};
</script>

<style>
.main-content {
  padding-top: 64px;
  background-color: black;
}
</style>
