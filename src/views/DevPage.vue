<template>
    <div class="dev-page">
        <detail-score :brands="testBrands"></detail-score>
    </div>
</template>

<script setup>
import DetailScore from "../components/DetailScore/DetailScore.vue";

const testBrands = ['Nike', 'Gucci', 'Zara']
</script>


<style scoped lang="less">
.dev-page {
    width: 1200px;
    margin: 90px auto;
    border: 1px solid;
    height: 400px;
}
</style>