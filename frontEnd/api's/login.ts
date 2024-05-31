
import useUser from "@/components/context/user-provider"
import { useNavigate } from "react-router-dom"

// types

interface user {
    email: string,
    password: string
}


export default async function login(user: user) {

    const { setUser } = useUser()
    const navigate = useNavigate()



    let response = await fetch(import.meta.env.VITE_BackendUrl + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        credentials: 'include'
    })

    if (response.ok) {
        let json = await response.json()
        setUser(json.user)
        return navigate("/")


    }
    else {
        alert("failed to login")
    }



}