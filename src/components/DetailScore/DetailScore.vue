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
                                     :class="getDetailClass(brand, detail, item)"
                                     :style="getDetailStyle(brand, detail, item)"
                                     @mouseenter="detailItemMouseEnter(detail)"
                                ></div>
                            </template>
                        </template>
                    </template>
                </div>
            </div>
            <div class="info-panel" v-if="shownDetail?.question">
                <div class="title">STATEMENT</div>
                <div class="content">{{shownDetail.question}}</div>
            </div>
            <div v-else></div>
        </div>
    </div>
</template>

<script setup>
import {colorPatten, dataset, getDataSet} from "./detail-score-utils";
import {computed, ref, watchEffect} from "vue";
import {selectedBrand} from "../../store/brand-store";

const brands = selectedBrand
const qQueries = ref([])
const data = computed(() => getDataSet({
    data: dataset,
    qQueries: qQueries.value || [],
    brands: selectedBrand.value
}))

const questionNumber = computed(() => {
    let result = 0
    data.value.forEach(section => {
        section.subSections.forEach(subSection => {
            result += subSection.questions.length
        })
    })
    return result
})

const visStyle = computed(() => ({
    gridTemplateColumns: (selectedBrand.value || []).map(_ => '90px').join(' ') + ' 1fr'
}))

const shownDetail = ref({
    question: ''
})

const getDetailClass = (brand, detail, selection) => {
    const isHighlighted = detail.question === shownDetail.value?.question
    return [
            isHighlighted ? 'highlight-item' : '',
    ]
}
const getDetailStyle = (brand, detail, section) => {
    const color = colorPatten[section.section.substring(0, 1)]
    const gainedScore = detail.scores?.filter(_ => _.company === brand).filter(_ => _.score > 0).length ?? false
    return {
        backgroundColor: gainedScore
                ? color
                // ? 'white'
                : '#191a1a',
        height: `${20 * detail.maxScore}px`,
        marginBottom: questionNumber.value > 100 ? '1px' : '4px'
    }
}

const detailItemMouseEnter = (detail) => {
    shownDetail.value = detail
}

const detailItemMouseLeave = () => {
    shownDetail.value = null
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

.info-panel {
    word-break: break-word;
    padding: 21px 18px;
    background: #4a4a4a;
    border-radius: 4px;
    max-height: 670px;
    overflow: auto;
    text-overflow: ellipsis;
}
.vis {
    display: grid;
    grid-column-gap: 10px;
    align-self: stretch;
}
.detail-container {
    display: flex;
    flex-direction: column;
    height: 640px;
    position: relative;
}
.highlight-item {
    outline: solid #4a4a4a 1px;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        background: #4a4a4a;
        left: -10px;
        width: 10px;
        bottom: -1px;
        top: -1px;
        border-radius: 4px 0 0 4px;
    }
    &::after {
        content: '';
        position: absolute;
        background: #4a4a4a;
        right: -10px;
        width: 10px;
        bottom: -1px;
        top: -1px;
    }
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