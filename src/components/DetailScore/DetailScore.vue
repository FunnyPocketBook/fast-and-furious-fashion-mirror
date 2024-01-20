<template>
    <div class="detail-score">
        <div class="form">
            <v-combobox
                multiple
                v-model="qQueries"
                label="Combobox"
                variant="outlined"
            ></v-combobox>
            <v-btn variant="text" @click="qQueries=[]">All</v-btn>
            <v-btn variant="text" @click="qQueries=['disclose']">Disclose</v-btn>
            <v-btn variant="text" @click="qQueries=['Animal']">Animal</v-btn>

        </div>
        <div class="vis" :style="visStyle">
            <div v-for="brand in brands">
                <div class="brand-name">{{brand}}</div>
                <div class="detail-container">
                    <template v-for="item in data">
                        <template v-for="subSection in item.subSections">
                            <template v-for="detail in subSection.questions">
                                <div class="detail-item"
                                     :style="getDetailStyle(brand, detail, item)"
                                     @mouseenter="detailClickHandler(detail)"
                                ></div>
                            </template>
                        </template>
                    </template>
                </div>
            </div>
            <div class="info-panel">
                <div class="question-container">
                    <div class="question-title">Question: </div>
                    <div class="question">{{shownDetail.question}}</div>
                </div>
                <div class="question-detail">
                    <div v-for="item in shownDetail.scores">
                        <div class="company-name">{{item.company}}</div>
                        <div class="score">{{item.score}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {colorPatten, dataset, getDataSet} from "./utils";
import {computed, ref, watchEffect} from "vue";

const props = defineProps({
    brands: Array
})

const qQueries = ref([])
const data = computed(() => getDataSet({
    data: dataset,
    qQueries: qQueries.value || [],
    brands: props.brands || []
}))

const visStyle = computed(() => ({
    gridTemplateColumns: (props.brands || []).map(_ => '56px').join(' ') + ' 1fr'
}))

const shownDetail = ref({
    question: ''
})
const getDetailStyle = (brand, detail, section) => {
    const color = colorPatten[section.section.substring(0, 1)]
    const gainedScore = detail.scores?.filter(_ => _.company === brand).filter(_ => _.score > 0).length ?? false
    return {
        backgroundColor: gainedScore
                // ? color
                ? 'white'
                : 'rgba(255,255,255,.2)',
        filter: detail.question === shownDetail.value?.question ? 'brightness(1.5)' : null,
        height: `${20 * detail.maxScore}px`
    }
}

const detailClickHandler = (detail) => {
    shownDetail.value = detail
}

// for debug
watchEffect(() => console.log(data.value))
</script>

<style scoped lang="less">
.detail-score {
    display: grid;
    height: 100%;
    padding: 24px;
    grid-column-gap: 20px;
    grid-template-columns: 1fr 4fr;
}

.brand-name {
    text-align: center;
    margin-bottom: 8px;
}
.form {
}

.info-panel {
    padding: 24px;

    .question-container {
        min-height: 250px;
    }

    .question-title {
        font-size: 16px;
        margin-bottom: 8px;
        opacity: 0.7;
    }
    .question {
        font-size: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
    }
}
.vis {
    display: grid;
    grid-column-gap: 10px;
    align-self: stretch;
}
.detail-container {
    display: flex;
    flex-direction: column;
    height: 320px;
}
.detail-item {
    margin-bottom: 1px;
}
.question-detail {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 20px;
}
.company-name {
    text-align: center;
    margin-bottom: 4px;
}
.score {
    text-align: center;
    font-size: 30px;
}
</style>