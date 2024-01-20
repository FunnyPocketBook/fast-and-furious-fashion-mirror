<template>
    <div class="detail-score">
        <v-combobox
            multiple
            v-model="qQueries"
            label="Combobox"
            variant="outlined"
        ></v-combobox>
    </div>
</template>

<script setup>
import {dataset, getDataSet} from "./utils";
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

watchEffect(() => console.log(data.value))
</script>

<style scoped lang="less">

</style>