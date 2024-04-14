export const getAllProduct = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products')
        const responseJson = await response.json();
        return responseJson
    }
    catch(error){
        return error?.response
    }
}

export const getSingleProduct = async (id) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const responseJson = await response.json();
        return responseJson
    }
    catch(error){
        return error?.response
    }
}

