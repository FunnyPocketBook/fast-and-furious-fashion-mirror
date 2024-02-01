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

const getSumOfBrand = (item: any) => {
    return (item.Governance || 0) +
        (item.Policies || 0) +
        (item.Traceability || 0) +
        (item['Know, Show, & Fix'] || 0) +
        (item['Spotlight Issues'] || 0)
}
export const getDetailScoreOfKeyAreas = (brands: string[], year: string) => {
    return brands
        .map(brand => {
            return {
                brand,
                Governance: dataset[brand][year].section1,
                Policies: dataset[brand][year].section2,
                Traceability: dataset[brand][year].section3,
                'Know, Show, & Fix': dataset[brand][year].section4,
                'Spotlight Issues': dataset[brand][year].section5,
            }
        })
        .sort((a, b) => getSumOfBrand(b) - getSumOfBrand(a))
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