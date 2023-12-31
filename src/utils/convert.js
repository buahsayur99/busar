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

export const faWishlist = (slide, dataWishlist) => {
    const filterData = dataWishlist.filter((data) => {
        return data.idProduct === slide.id
    })

    return filterData
}

export const convertTotalPrice = (product) => {
    const total = product.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.totalPrice;
    }, 0);
    const hasil = formattedNumber(total);

    return hasil;
}

export const convertTotalAmountProduct = (product, cart) => {
    const filterAmount = product.filter((data) => {
        return data.id === cart.idProduct
    })
    return filterAmount[0].amount
}

export const convertProductByCart = (product, cart) => {
    const filterAmount = product.filter((data) => {
        return data.id === cart.idProduct
    })
    return filterAmount[0]
}

export const filterAllProductByWithlist = (product, withlist) => {
    const productWithlist = withlist.map((item) => product.find((product) => product.id === item.idProduct))

    return productWithlist;
}

// Function to total all cart
export const totalCartByAllProductCart = (cart) => {
    const total = cart.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.amount;
    }, 0);

    return total
}