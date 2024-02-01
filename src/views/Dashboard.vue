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
                    <div class="desc">To calculate their scores in each key area, brands had to answer over 300 questions regarding important issues, such as the ones below.  If a brand has 0 points for a question, it means
                        they refused to answer the question. A score of 1 means they have disclosed what their practices are, which increases their transparency.</div>
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
        line-height: 100%; /* 16px */
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
  