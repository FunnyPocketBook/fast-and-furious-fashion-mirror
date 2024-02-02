import dataset from '../../data/fashion_2023.json'
import maxScores from '../../data/max_scores.json'
import {presetQuestions} from "./preset-questions";

const getDataSet = ({ data, qQueries = [], brands = []}) => {
    const item = data[0]
    const keys = [...Object
        .keys(item)
        .filter(key => key !== 'Company' && key !== 'Country')
    ]

    // swap to match design
    const temp = keys[0]
    keys[0] = keys[1]
    keys[1] = temp

    const questionList = []

    let presetQuestionList = []

    // preset questions
    if (Object.keys(presetQuestions).indexOf(qQueries[0]) !== -1) {
        presetQuestionList = presetQuestions[qQueries[0]]
    } else if (keys.indexOf(qQueries[0]) !== -1) {
        Object.keys(item[qQueries]).forEach(subSectionKey => {
            console.log(Object.keys(item[qQueries][subSectionKey]))
            presetQuestionList = presetQuestionList.concat(Object.keys(item[qQueries][subSectionKey]))
        })
    }

    return keys
        .map(key => ({
            section: key,
            subSections: Object.keys(item[key])
                .map(subSectionKey => ({
                    subsectionTitle: subSectionKey,
                    questions: Object.keys(item[key][subSectionKey])
                        .filter(question => questionList.indexOf(question) === -1) // repeated question
                        .filter(question => presetQuestionList.length
                            ? presetQuestionList.indexOf(question) !== -1
                            : qQueries.length
                                ? qQueries.filter(_ => question.toLowerCase().includes(_.toLowerCase())).length > 0
                                : true
                        )
                        .map(question => {
                            questionList.push(question)
                            const allScores = data.map(_ => ({
                                company: _.Company,
                                score: _[key][subSectionKey][question]
                            }))

                            const maxScore = maxScores[key][subSectionKey][question] || 1
                            const scores = allScores.filter(_ => brands.indexOf(_.company) !== -1)

                            return {
                                question,
                                scores,
                                maxScore
                            }
                        })
                }))
                .filter(_ => _.questions.length > 0)
        }))
        .filter(_ => _.subSections.length > 0)
}

export {
    dataset,
    getDataSet,
}