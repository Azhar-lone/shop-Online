


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


        const baseUrl = import.meta.env.VITE_BaseUrl
        let response = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + '/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: 'include'
        })

        if (response.ok) {
            let json = await response.json()
            localStorage.setItem("userName", json.user.userName)
            return json.user


        }
        else {
            alert("failed to login")
            return 1
        }

    } catch (error) {
        console.log(error)

    }







}

interface countries {
    country: string
}

export async function getContries(setCountries: React.Dispatch<React.SetStateAction<countries[]>>) {
    try {
        const baseUrl = import.meta.env.VITE_BaseUrl
        let res = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "/general/countries")
        if (res.ok) {
            let arr = await res.json()
            setCountries(arr.countries)
            
            return
        }
        // call yourself until you don't get 200 ok
        getContries(setCountries)


    } catch (error) {
        console.error(error)
    }



}
