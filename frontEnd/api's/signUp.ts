
import useUser from "@/components/context/user-provider"
import { useNavigate } from "react-router-dom"



// types

interface User {
    userName: string;
    firstName: string;
    lastName: string;
    country: string;
    password: string;
    confirmPassword: string;
}

export default async function signUp(user: User) {



    try {
        const { setUser } = useUser()
        const navigate = useNavigate()
        let response = await fetch(import.meta.env.VITE_BackendUrl + '/users/signup', {
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

    } catch (error) {
        console.log(error)

    }







}


export async function getContries(setCountries: React.Dispatch<React.SetStateAction<string[]>>) {
    try {

        let res = await fetch(import.meta.env.VITE_BackendUrl + "/general/countries", {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {

            // Check if response is HTML (replace with your logic)
            if (res.headers.get('Content-Type')?.includes('text/html')) {
                // Handle HTML response (e.g., parse with cheerio)
                console.error('API endpoint might be returning HTML instead of JSON');
                console.log(res)
                return;  // Exit the function if it's HTML
            }

            let arr = await res.json()

            setCountries(arr.countries)
            return
        }
        // call yourself until you don't get 200 ok
        // getContries()


    } catch (error) {
        console.log(error)
    }



}
