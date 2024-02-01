<template>
    <div class="section-title">Brands are scored based on their performance in  five key areas:</div>
    <div class="section-explanation">
        <div class="explanation-item" v-for="item in items">
            <img :src="item.iconUrl" :alt="item.title">
            <div>
                <div class="title">{{item.title}}</div>
                <div class="desc">{{item.desc}}</div>
                <div v-if="item.descList"
                     v-for="descItem in item.descList"
                     class="desc"
                >
                    {{descItem}}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import GovernanceIcon from "../assets/icons/Governance.png"
import PoliciesIcon from "../assets/icons/Policies.png"
import KSFIcon from "../assets/icons/KSF.png"
import TraceabilityIcon from "../assets/icons/Traceability.png"
import SpotlightIssueIcon from "../assets/icons/SpotlightIssue.png"
const items = [
    {
        title: "Governance",
        desc: "Who is responsible for social and environmental impacts in the company? ",
        iconUrl: GovernanceIcon
    }, {
        title: "Policies",
        desc: 'What human rights, environmental policies, and procedures does the company publicly disclose?',
        iconUrl: PoliciesIcon
    }, {
        title: "Know, Show, Fix",
        desc: 'Do they disclose how they resolve issues relating to human rights and the environment?',
        iconUrl: KSFIcon
    }, {
        title: "Traceability",
        desc: 'Is it easy to track their supply chain?',
        iconUrl: TraceabilityIcon
    }, {
        title: "Spotlight Issues",
        desc: 'Does the brand care about...',
        descList: ['1. Gender & racial equality',
        '2. Decent work & purchasing practices',
        '3. Sustainable sourcing & materials',
        '4. Over consumption of water',
        '5. Minimizing their water footprint',
        '6. Climate change & biodiversity'],
        iconUrl: SpotlightIssueIcon
    }
]
</script>

<style scoped lang="less">
.section-title {
    font-size: 24px;
    font-weight: 500;
    line-height: 32px; /* 133.333% */
    margin-top: 32px;
}
.section-explanation {
    margin-top: 18px;
    display: grid;
    grid-auto-flow: column;
    column-gap: 52px;
    row-gap: 24px;
    grid-template-columns: 1fr 1fr 1.2fr;
    grid-template-rows: 1fr 1fr;

    :last-child {
        grid-row-start: 1;
        grid-row-end: 3;
    }
}

.explanation-item {
    display: flex;

    img {
        width: 75px;
        height: 75px;
        flex-shrink: 0;
        margin-right: 18px;
    }

    .title {
        font-size: 22px;
        margin-bottom: -2px;
    }

    .desc {
        font-size: 16px;
        color: rgba(255,255,255,0.8);
        font-weight: 300;
    }
}
</style>