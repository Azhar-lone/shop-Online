import React, { createContext, useContext, useState } from 'react';

// Types
import User from "../../../types/user"



interface UserProviderState {
    user: User | null; // User can be null or a User object
    setUser: (user: User) => void;
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void
}
const initialState: UserProviderState = {
    user: {
        userName: '',
        firstName: '',
        lastName: '',
        country: '',
        profilePic: '',
        timeStamp: '',
        products: [],
        cartItems: [],
    },
    setUser: () => { }, // Implement setUser logic here
    isLogin: false,
    setIsLogin: () => { }
};

const UserContext = createContext<UserProviderState>(initialState); // Initial value is null

export default function useUser() {
    return useContext(UserContext);
}

interface UserProps {
    children: React.ReactNode;
}


export function UserProvider({ children }: UserProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false)

    return (
        <UserContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
            {children}
        </UserContext.Provider>
    );
}
