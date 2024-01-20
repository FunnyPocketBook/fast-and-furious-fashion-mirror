<template>
    <div class="section-title">Choose your brands</div>
    <div class="section-desc">You can select up to 7 brands to compare at once.</div>
    <v-combobox variant="outlined" v-model="selectedBrands" :items="brands" label="Select brand(s)" multiple>
        <template v-slot:selection="data">
            <v-chip :key="JSON.stringify(data.item)" v-bind="data.attrs" :model-value="data.selected"
                    :disabled="data.disabled" size="small" @click:close="data.parent.selectItem(data.item)">
                <template v-slot:prepend>
                    <v-avatar class="bg-accent text-uppercase" start>{{ data.item.title.slice(0, 1)
                        }}</v-avatar>
                </template>
                {{ data.item.title }}
            </v-chip>
        </template>
    </v-combobox>
</template>
  
<script>
export default {
    name: 'SelectionComponent',
    data() {
        return {
            selectedBrands: [],
            brands: ['Zara', 'Primark', 'Nike', 'Hema', 'Gucci', 'H&M', 'Zalando'],
            selectedYears: [],
            years: ['2017', '2018', '2019', '2020', '2021', '2022'],
            selectedKeyAreas: [],
            keyAreas: ['Governance', 'Policies', 'Traceability', 'Know, Show, Fix', 'Spotlight Issues'],
            keyAreaDescriptions: [
                { title: 'Governance', text: 'Who is responsible for social and environmental impacts in the company?' },
                { title: 'Policies', text: 'What human rights, environmental policies, and procedures does the company publicly disclose?' },
                { title: 'Traceability', text: 'Is it easy to track their supply chain?' },
                { title: 'Know, Show, Fix', text: 'Do they disclose how they identify and resolve issues relating to human rights and the environment?' },
                { title: 'Spotlight Issues', text: 'Does the brand care about gender & racial equality, decent work & purchasing practices, sustainable sourcing & materials, over consumption of water, minimizing their water footprint, and climate change & biodiversity?' },
            ],
        };
    },
};
</script>
  
<style scoped>
.section-title {
    margin-top: 64px;
    font-size: 24px;
    font-weight: 500;
    line-height: 32px; /* 133.333% */
}

.section-desc {
    opacity: .8;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: .15px;
    margin-bottom: 18px;
}

.v-combobox {
    max-width: 1000px;
}
</style>
  