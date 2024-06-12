

// types

interface user {
    email: string,
    password: string
}



export default async function login(user: user) {



    const baseUrl = import.meta.env.VITE_BaseUrl

    let response = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + '/users/login', {
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



}