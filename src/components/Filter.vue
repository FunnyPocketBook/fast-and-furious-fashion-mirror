<template>
    <div class="section-title">Choose your brands</div>
    <div class="section-desc">You can select up to {{maxBrand}} brands to compare at once.</div>
    <v-combobox
            v-model="selectedBrand"
            v-model:search="search"
            variant="outlined"
            :hide-no-data="false"
            :items="brandNames"
            :hint="`Maximum of ${maxBrand} brands`"
            label="Brands"
            multiple
            auto-select-first
    >
        <template v-slot:no-data>
            <v-list-item>
                <v-list-item-title>
                    No results matching "<strong>{{ search }}</strong>".
                </v-list-item-title>
            </v-list-item>
        </template>

        <template v-slot:selection="data">
            <v-chip v-bind="data.attrs" :model-value="data.selected">
                <template v-slot:prepend>
                    <v-avatar class="bg-accent text-uppercase" start>{{ data.item.title.slice(0, 1) }}</v-avatar>
                </template>
                {{ data.item.title }}
            </v-chip>
        </template>
    </v-combobox>
</template>

<script setup lang="ts">
import {selectedBrand} from "../store/brand-store";
import {getBrandNames} from "../utils/brand-names.ts";
import {watch} from "vue";

const search = ''
const brandNames = getBrandNames()
const maxBrand = 7

// temporary: init 5 brands here
selectedBrand.value = ['Nike', 'Zara', 'H&M', 'Primark', 'Puma', 'Gucci', 'Hema']

watch(selectedBrand, (newValue, oldValue) => {
    // add new brand
    if (newValue.length - oldValue.length === 1) {
        const newAddedBrand = newValue[newValue.length - 1]
        if (brandNames.indexOf(newAddedBrand) === -1) {
            // todo error msg
            selectedBrand.value = oldValue
        }

        if(newValue.length > maxBrand) {
            selectedBrand.value = newValue.slice(0, maxBrand)
            // todo error msg
            return
        }
    }
})

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
  