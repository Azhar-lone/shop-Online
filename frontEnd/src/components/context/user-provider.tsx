import React, { createContext, useContext, useEffect, useState } from "react"

interface userProviderProps {
    userName: string

}

const initialState: userProviderState = {
    user: {},
    setUser: () => null,
}
const UserProviderContext = createContext<userProviderState>(initialState)

export function UserProvider() {
    const [user, setUser] = useState<object|undefined>()
}

