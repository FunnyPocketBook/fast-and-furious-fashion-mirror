import allYearsSections from '../data/all_years_sections.json'
import _maxScores from '../data/max_scores.json'

const dataset: Record<string, Record<string, {
    section1: number| null
    section2: number| null
    section3: number| null
    section4: number| null
    section5: number| null
}>> = allYearsSections as any

const maxScores = _maxScores as any

export const getSumOfBrand = (brand: any) => {
    return (brand.Governance || 0) +
        (brand.Policies || 0) +
        (brand.Traceability || 0) +
        (brand['Know, Show, & Fix'] || 0) +
        (brand['Spotlight Issues'] || 0)
}
export const getDetailScoreOfKeyAreas = (brands: string[]) => {
    const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023']
    return brands
        .map(brand => {
            return {
                brand,
                scores: years.map(year => ({
                    year,
                    Governance: dataset[brand][year].section1,
                    Policies: dataset[brand][year].section2,
                    Traceability: dataset[brand][year].section3,
                    'Know, Show, & Fix': dataset[brand][year].section4,
                    'Spotlight Issues': dataset[brand][year].section5,
                }))
            }
        })
        .sort((a, b) => getSumOfBrand(b.scores[b.scores.length - 1]) - getSumOfBrand(a.scores[a.scores.length - 1]))
}

export const getMaxPossible = () => {
    const result: Record<string, number> = {
        total: 0,
    }
    Object.entries(maxScores).forEach(([sectionName, section]) => {
        result[sectionName] = 0
        Object.entries(section as any).forEach(([_, questions]) => {
            result[sectionName] += Object.values(questions as any).reduce((accumulator, a: any) => {
                return accumulator as number + a;
            }, 0) as number
        })
        result.total += result[sectionName]
    });

    return result
}