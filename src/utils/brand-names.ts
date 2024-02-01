import dataset from '../data/fashion_2023.json'

let brandNames: string[] = []

export const getBrandNames = () => {
    if (brandNames.length) return brandNames

    brandNames = dataset.map(_ => _.Company)
    return brandNames
}