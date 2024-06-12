
import useUser from "@/components/context/user-provider"
import { useNavigate } from "react-router-dom"

// types

interface user {
    email: string,
    password: string
}


export default async function logout() {
    try {
        const baseUrl = import.meta.env.VITE_BaseUrl
        let response = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + '/users/logout', {
            method: 'POST',
            credentials: 'include'
        })

        if (response.ok) {
            localStorage.clear()
            location.reload()
        }
        else {
            alert("failed to login")
        }





    } catch (error) {
        alert(error.message)
    }



}