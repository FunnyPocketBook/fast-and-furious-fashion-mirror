<template>
  <div class="wrapper">
    <div class="banner">
      <h1 class="title">YOUR CLOTHES SUCK.</h1>
      <p class="subtitle">Fast fashion isn't your friend.</p>
    </div>
    <div class="image-section">
      <img src="../assets/shirts-logo.svg" alt="Clothes" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerSection'
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  min-height: 100vh;
}

.banner title {
  font-size: 3rem;
}

.banner .subtitle {
  font-size: 1.5rem;
  margin-top: 1rem;
}

img {
  width: 50%;
  float: right;
}
</style>
