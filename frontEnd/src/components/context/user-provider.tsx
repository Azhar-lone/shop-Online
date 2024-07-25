import React, { createContext, useContext, useState } from "react";

// Types
import  { CartType,UserFull } from "../../types/user";

interface UserProviderState {
  user: UserFull; // User can be null or a User object
  setUser: React.Dispatch<React.SetStateAction<UserFull>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  cart: CartType[];
  setCart: (cart: CartType[]) => void;
}
const initialState: UserProviderState = {
  user: {
    userName: "",
    firstName: "",
    lastName: "",
    country: "",
    profilePic: "",
    createdAt: new Date(Date.now()),
    products: [],
    cartItems: [],
    followers: [],
    following: [],
    role: "admin",
    _id: "",
  },
  setUser: () => {}, // Implement setUser logic here
  isLogin: false,
  setIsLogin: () => {},
  cart: [],
  setCart: () => {},
};

const UserContext = createContext<UserProviderState>(initialState); // Initial value

export default function useUser() {
  return useContext(UserContext);
}

interface UserProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProps) {
  const [user, setUser] = useState<UserFull>(initialState.user);
  const [isLogin, setIsLogin] = useState<boolean>(initialState.isLogin);
  const [cart, setCart] = useState<CartType[]>(initialState.cart);
  return (
    <UserContext.Provider
      value={{ user, setUser, isLogin, setIsLogin, cart, setCart }}
    >
      {children}
    </UserContext.Provider>
  );
}
