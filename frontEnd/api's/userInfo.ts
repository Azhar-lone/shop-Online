
// types
import User from "../types/user"


export default async function getUserByUserName(userName: string, setUser: React.Dispatch<React.SetStateAction<User | null>>) {




    let response = await fetch(import.meta.env.VITE_BackendUrl + '/users/' + userName)

    if (response.ok) {
        let json = await response.json()
        return setUser(json.user)


    }
    else {
        alert("failed to fetch user info")
    }



}