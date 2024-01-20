import dataset from './fashion_2023.json'

const getDataSet = ({ data, qQueries = [], brands = []}) => {
    const item = data[0]
    const keys = Object
        .keys(item)
        .filter(key => key !== 'Company' && key !== 'Country')

    return keys
        .map(key => ({
            section: key,
            subSections: Object.keys(item[key])
                .map(subSectionKey => ({
                    subsectionTitle: subSectionKey,
                    questions: Object.keys(item[key][subSectionKey])
                        .filter(question => qQueries.length
                            ? qQueries.filter(_ => question.toLowerCase().includes(_.toLowerCase())).length > 0
                            : true
                        )
                        .map(question => {
                            const allScores = data.map(_ => ({
                                company: _.Company,
                                score: _[key][subSectionKey][question]
                            }))
                            // ! todo maxScore can be 0 if it is only comes from the existing data
                            const maxScore = Math.max(...allScores.map(_ => _.score)) || 1
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
    getDataSet
}