import {reactive} from "vue";

export const interaction = reactive({
    hoveringBrand: '',
    hoveringAspect: '',
    hoveringQuestion: ''
})

export const resetInteraction= () => {
    interaction.hoveringBrand = ''
    interaction.hoveringAspect = ''
    interaction.hoveringQuestion = ''
}