<template>
    <div class="detail-score" @mouseleave="resetInteractionFromVis3">
        <div class="form">
            <v-combobox
                multiple
                v-model="qQueries"
                label="Search by keyword"
                variant="outlined"
            ></v-combobox>
            <div class="button" @click="qQueries=[]">Show All</div>
            <hr style="margin: 8px 0">
            <div
                    class="button"
                    v-for="(key, value) in keys"
                    @click="qQueries=[value]"
            >
                {{key}}
            </div>
            <hr style="margin: 8px 0">
            <div
                    class="button"
                    v-for="question in Object.keys(presetQuestions)"
                    @click="qQueries = [question]"
            >{{ question }}</div>
            <div class="button" @click="qQueries=['disclose']">Disclosure</div>
        </div>
        <div v-if="selectedYear !== '2023'" class="vis-placeholder">
            <div class="title">This visualization is only for year 2023</div>
            <v-btn variant="outlined" size="large" @click="selectedYear='2023'">Reset to 2023</v-btn>
        </div>
        <div class="vis" :style="visStyle" v-else>
            <div class="left-info">
                <div class="left-info-brand">BRAND</div>
                <div></div>
                <div class="left-info-point">POINTS</div>
            </div>
            <div v-for="brand in brands">
                <div class="brand-name">{{brand}}</div>
                <div class="brand-name-line"></div>
                <div class="detail-container">
                    <template v-for="item in data">
                        <template v-for="subSection in item.subSections">
                            <template v-for="detail in subSection.questions">
                                <div class="detail-item"
                                     :class="getDetailClass(brand, detail, item)"
                                     :style="getDetailStyle(brand, detail, item)"
                                     @mouseenter="detailItemMouseEnter(brand, detail, item)"
                                     @mouseleave="detailItemMouseLeave"
                                ></div>
                            </template>
                        </template>
                    </template>
                </div>
                <div class="point">{{ pointListForBrands[brand] }}</div>
            </div>
            <div class="info-panel" v-if="shownDetail?.question">
                <div class="title">STATEMENT</div>
                <div class="content">{{shownDetail.question}}</div>
                <br>
                <div>Maximal Score: {{shownDetail.maxScore}}</div>
            </div>
            <div v-else></div>
        </div>
    </div>
</template>

<script setup>
import {dataset, getDataSet} from "./detail-score-utils";
import {computed, ref, watchEffect} from "vue";
import {selectedBrand, selectedYear} from "../../store/brand-store";
import {
    interactionFromVis1, interactionFromVis2,
    interactionFromVis3,
    resetInteractionFromVis1, resetInteractionFromVis2,
    resetInteractionFromVis3
} from "../../store/interaction-store";
import {sectionAspectMap} from "../../utils/aspects";
import {colorPattenForAspects} from "../../utils/color";
import {presetQuestions} from "./preset-questions";

const brands = selectedBrand
const qQueries = ref([])
const data = computed(() => getDataSet({
    data: dataset,
    qQueries: qQueries.value || [],
    brands: selectedBrand.value
}))

const keys = {
    '2. GOVERNANCE': 'Governance',
    '1. POLICY & COMMITMENTS': 'Policies',
    '3. TRACEABILITY': 'Traceability',
    '4. KNOW, SHOW & FIX': 'Know, Show, & Fix',
    '5. SPOTLIGHT ISSUES': 'Spotlight Issues'
}

const questionNumber = computed(() => {
    let result = 0
    data.value.forEach(section => {
        section.subSections.forEach(subSection => {
            result += subSection.questions.length
        })
    })
    return result
})

const pointListForBrands = computed(() => {
    let result = {}
    brands.value.forEach(brand => {
        result[brand] = 0
    })
    data.value.forEach(section => {
        section.subSections.forEach(subSection => {
            subSection.questions.forEach(question => {
                question.scores.forEach(record => {
                    result[record.company] += record.score
                })
            })
        })
    })
    return result
})

const visStyle = computed(() => ({
    gridTemplateColumns: '.3fr ' + (selectedBrand.value || []).map(_ => '.3fr').join(' ') + ' 1fr'
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
    const color = colorPattenForAspects[sectionAspectMap[section.section]]
    const gainedScore = detail.scores?.filter(_ => _.company === brand).filter(_ => _.score > 0).length ?? false

    let notHighlightedBrand = false
    let notHighlightedAspect = false
    if (interactionFromVis1.hoveringBrand && interactionFromVis1.hoveringBrand !== brand) {
        notHighlightedBrand = true
    }

    if (interactionFromVis2.hoveringBrand && interactionFromVis2.hoveringBrand !== brand) {
        notHighlightedBrand = true
    }

    if (interactionFromVis2.hoveringAspect && interactionFromVis2.hoveringAspect !== sectionAspectMap[section.section]) {
        notHighlightedAspect = true
    }

    return {
        backgroundColor: gainedScore
                ? notHighlightedBrand
                        ? color + '50'
                        : color + (notHighlightedAspect ? '80' : '')
                : '#191a1a',
        height: `${25 * detail.maxScore}px`,
        marginBottom: questionNumber.value > 100 ? '1px' : '4px'
    }
}

const detailItemMouseEnter = (brand, detail, section) => {
    shownDetail.value = detail

    interactionFromVis3.hoveringBrand = brand
    interactionFromVis3.hoveringAspect = sectionAspectMap[section.section]
    interactionFromVis3.hoveringQuestion = detail.question

    resetInteractionFromVis1()
    resetInteractionFromVis2()
}

const detailItemMouseLeave = () => {
    shownDetail.value = null
    resetInteractionFromVis3()
}

</script>

<style scoped lang="less">
.detail-score {
    display: grid;
    height: 100%;
    padding: 24px;
    grid-column-gap: 20px;
    grid-template-columns: 1fr 4fr;
}

.left-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.brand-name {
    text-align: center;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    max-width: 80px;
    padding-bottom: 16px;
}

.brand-name-line {
    position: relative;
    &::before {
        content: '';
        position: absolute;
        display: block;
        bottom: 8px;
        left: -6px;
        right: -6px;
        height: 1px;
        background: white;
    }
}

.point {
    margin-top: 16px;
    text-align: center;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        display: block;
        top: -8px;
        left: -6px;
        right: -6px;
        height: 1px;
        background: white;
    }
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

.vis-placeholder {
    height: 680px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title {
        font-size: 32px;
        opacity: .7;
        margin-bottom: 32px;
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
    height: 600px;
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
        border-radius: 1000px 0 0 1000px;
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

.left-info {
    text-align: center;
}

.button {
    padding: 8px 8px;
    transition: all .1s;

    &:hover {
        background: #3a3a3a;
        border-radius: 8px;
    }
}
</style>