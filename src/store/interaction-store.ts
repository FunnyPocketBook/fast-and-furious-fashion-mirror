import {reactive} from "vue";

export const interactionFromVis1 = reactive({
    hoveringYear: '',
    hoveringBrand: '',
})

export const resetInteractionFromVis1 = () => {
    interactionFromVis1.hoveringYear = ''
    interactionFromVis1.hoveringBrand = ''
}

export const interactionFromVis2 = reactive({
    hoveringBrand: '',
    hoveringAspect: ''
})

export const resetInteractionFromVis2 = () => {
    interactionFromVis2.hoveringBrand = ''
    interactionFromVis2.hoveringAspect = ''
}

export const interactionFromVis3 = reactive({
    hoveringBrand: '',
    hoveringAspect: '',
    hoveringQuestion: ''
})

export const resetInteractionFromVis3 = () => {
    interactionFromVis3.hoveringBrand = ''
    interactionFromVis3.hoveringAspect = ''
    interactionFromVis3.hoveringQuestion = ''
}