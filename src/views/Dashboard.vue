<template>
    <div class="dashboard">
        <div class="content">
            <Headline />

            <div class="filter-container">
                <Filter />
            </div>

            <div class="vis-container">
                <div class="vis">
                    <div class="title">Final Score Overview</div>
                    <BrandOveralScore class="card"/>
                </div>
                <div class="vis">
                    <div class="title">Key Area Breakdown</div>
                    <BrandByKeyAreaScore class="card"/>
                </div>
                <div class="vis last-vis">
                    <div class="title">Score breakdown</div>
                    <div class="desc">To calculate their scores in each key area,
                        brands were required to answer more than 300 questions concerning important issues.
                        You can explore all the questions here. <br>
                        If a brand scores 0 points for a question,
                        it indicates that they either failed to meet the scoring criteria or chose not to answer the question.
                        For each question, a brand can either receive a full mark or no mark at all.
                        Different questions may carry different weights.</div>
                    <DetailScore class="card"/>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import backgroundImage from '../assets/background.jpg';
import Filter from '../components/Filter.vue';
import BrandByKeyAreaScore from '../components/BrandByKeyAreaScore.vue';
import BrandOveralScore from '../components/BrandOveralScore.vue';
import Headline from "../components/Headline.vue";
import DetailScore from "../components/DetailScore/DetailScore.vue";

const bgImageUrl = `url(${backgroundImage})`
</script>
  
  
<style scoped lang="less">
.dashboard {
    color: white;
    background-size: contain;
    background-position: top center;
    min-height: 100vh;
    width: 100%;
    padding-top: 90px;
    background-image: v-bind(bgImageUrl);

    .content {
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 52px 64px;
    }
}

.vis-container {
    margin-top: 56px;
    display: grid;
    min-height: 1000px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.4fr 1fr;
    grid-column-gap: 48px;
    grid-row-gap: 48px;
}

.vis {
    display: grid;
    grid-template-rows: auto 1fr;

    .title {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 18px;
        height: 100%;

    }

    .desc {
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0.15px;
        margin-top: -10px;
        margin-bottom: 18px;
        opacity: .8;
    }

    .card {
        padding: 24px;
        border-radius: 8px;
        background-color: #272727;
        align-self: stretch;
    }
}

.last-vis {
    grid-template-rows: auto auto 1fr; // for desc, not a good method tho
    grid-column-start: 1;
    grid-column-end: 3;
}
</style>
  