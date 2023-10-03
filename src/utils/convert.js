import menuData from "../data/menuData"

export const covertInfoHalamanToNameButton = (pathPage) => {
    const filterDataMenuByPathPage = menuData.filter((data) => {
        return data.toLink === pathPage
    })

    return filterDataMenuByPathPage[0].nameLink
}