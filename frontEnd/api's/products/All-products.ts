export async function getCategories() {

    try {

        const baseUrl = import.meta.env.VITE_BaseUrl
        let res = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "categories")
        let toJson = await res.json()
        if (res.ok) {
            return toJson.categories

        }
        console.log(toJson.msg)
        return 1
    } catch (error) {
        console.log(error)



    }

}
export async function getAllProducts(page: number) {

    try {

        const baseUrl = import.meta.env.VITE_BaseUrl
        let res = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "products/?page=" + page)
        let toJson = await res.json()
        if (res.ok) {
            return toJson.products

        }
        console.log(toJson.msg)
        return 1
    } catch (error) {
        console.log(error)
        return 1;
    }


}