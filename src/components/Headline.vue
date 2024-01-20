<template>
    <div class="headline">
        <h1>
            <span>Fashion Brands: </span>
            <br>The Good, The Bad,
            <br>And The Ugly
        </h1>
        <p>Not all fashion brands are created equal. Find out which ones are the most transparent about their practices.</p>
    </div>

    <button class="title-button">
        <span>Explore the data</span>
        <img :src="arrowIcon" alt="">
    </button>
    <button class="title-button">
        <span>Learn more</span>
        <img :src="arrowIcon" alt="" style="transform: rotate(-90deg)">
    </button>

    <SectionExplanation class="explanations"/>
</template>

<script setup>
import SectionExplanation from "./SectionExplanation.vue";
import arrowIcon from "../assets/arrow-down.svg"
</script>

<style scoped lang="less">
.headline {
    padding: 52px 0;

    p {
        color: #FFF;
        font-size: 32px;
        font-weight: 300;
        line-height: 1.1;
        margin-top: 8px;
        opacity: .8;
        max-width: 1100px;
    }

    h1 {
        font-family: "sans-serif";
        font-size: 80px;
        font-weight: normal;
        line-height: 1.1; /* 88px */
        letter-spacing: 0.8px;
        text-transform: capitalize;

        span {
            font-weight: 700;
        }
    }

}

.title-button {
    border: 1px solid;
    border-radius: 1000px;
    display: inline-flex;
    margin-right: 12px;
    padding: 0 10px;
    justify-content: center;
    align-items: center;

    span {
        padding: 10px 10px 10px 24px;
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
        letter-spacing: 0.1px;
    }
    img {
        margin-right: 10px;
    }
}
</style>