import dataset from './fashion_2023.json'

const getDataSet = ({ data, qQueries = [], brands = []}) => {
    const item = data[0]
    const keys = Object
        .keys(item)
        .filter(key => key !== 'Company' && key !== 'Country')

    return keys
        .map(key => ({
            section: key,
            subSection: Object.keys(item[key])
                .map(subSectionKey => ({
                    key: subSectionKey,
                    questions: Object.keys(item[key][subSectionKey])
                        .filter(question => qQueries.length
                            ? qQueries.filter(_ => question.toLowerCase().includes(_.toLowerCase())).length > 0
                            : true
                        )
                        .map(question => {
                            const maxScore = Math.max(...data.map(_ => _[key][subSectionKey][question]))
                            const scores = data
                                .filter(_ => brands.indexOf(_.Company) !== -1)
                                .map(_ => ({
                                    company: _.Company,
                                    score: _[key][subSectionKey][question]
                                }))

                            return {
                                question,
                                scores,
                                maxScore
                            }
                        })
                }))
                .filter(_ => _.questions.length > 0)
        }))
        .filter(_ => _.subSection.length > 0)
}

export {
    dataset,
    getDataSet
}