export const SearchAPI = async(searchQuery) => {
    try{
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
        const res = response.json()
        return res
    }
    catch(error){
        console.log(error,'error')
    }
}

export const getCartDetails = async(data) => {
    const payload = {data}
    const UserId = localStorage.getItem('UserID')
    console.log(UserId,'userId',payload)
    try{
        const res = await fetch(`http://localhost:8000/cart/${UserId}`,{
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload.data)
        })
        const response = await res.json();
        console.log(response,'called')
        return response
        
    }
    catch(error){
        return error?.response
    }
}

export const getCartItems = async(id) => {
    try{
        const res = await fetch(`http://localhost:8000/cartItem/${id}`)
        const response = await res.json()
        return response
    }catch(e){
        return e?.response
    }
}