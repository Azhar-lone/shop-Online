import productType from "../types/product"

export async function userProducts(setProducts: React.Dispatch<React.SetStateAction<productType[]>>, pageNumber: Number) {
    try {
        let response = await fetch("")
        if (response.ok) {
            let json = await response.json()
            setProducts(json.products)
            return
        }
        return alert("failed to fetch your products")


    } catch (error) {
        console.log(error)
    }

}