export async function getAboutUsInfo() {

    try {
        const baseUrl = import.meta.env.VITE_BaseUrl
        let res = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "general/aboutus")
        let toJson = await res.json()
        if (res.ok) {
            return toJson.aboutus

        }


    } catch (error) {
        return 1
    }


}