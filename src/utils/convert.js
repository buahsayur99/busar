import menuData from "../data/menuData"

export const covertInfoHalamanToNameButton = (pathPage) => {
    const filterDataMenuByPathPage = menuData.filter((data) => {
        return data.toLink === pathPage
    })

    if (filterDataMenuByPathPage.length === 0) return ""
    return filterDataMenuByPathPage[0].nameLink
}

export const convertObjectToArray = (event) => {
    const objFromDB = JSON.parse(event);
    const arr = Object.values(objFromDB);

    return arr
}

export const formattedNumber = (numbers) => {
    // Format angka menggunakan toLocaleString
    const formattedNumber = numbers.toLocaleString();

    return formattedNumber;
}