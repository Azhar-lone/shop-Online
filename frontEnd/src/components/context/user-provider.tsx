import React, { createContext, useContext, useState } from 'react';

// Types
import User, { CartType } from "../../types/user"



interface UserProviderState {
    user: User; // User can be null or a User object
    setUser: (user: User) => void;
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void
    cart: CartType[],
    setCart: (cart: CartType[]) => void
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
        followers: [],
        following: [],
        role: "admin",
        _id: ""
    },
    setUser: () => { }, // Implement setUser logic here
    isLogin: false,
    setIsLogin: () => { },
    cart: []
    ,
    setCart: () => { }


};

const UserContext = createContext<UserProviderState>(initialState); // Initial value is null

export default function useUser() {
    return useContext(UserContext);
}

interface UserProps {
    children: React.ReactNode;
}


export function UserProvider({ children }: UserProps) {
    const [user, setUser] = useState<User>(initialState.user);
    const [isLogin, setIsLogin] = useState<boolean>(initialState.isLogin)
    const [cart, setCart] = useState<CartType[]>(initialState.cart)
    return (
        <UserContext.Provider value={{ user, setUser, isLogin, setIsLogin, cart, setCart }}>
            {children}
        </UserContext.Provider>
    );
}
