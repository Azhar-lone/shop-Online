import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';


// Types
import { productCardType } from '@/types/product';

interface productProviderState {
    totalProducts: number
    setTotalProducts: (totalProducts: number) => void
    products: productCardType[]; // User can be null or a User object
    setProducts: Dispatch<SetStateAction<productCardType[]>>;
}
const initialState: productProviderState = {
    totalProducts: 0,
    products: [],
    setProducts: () => ([]), // Implement setUser logic here
    setTotalProducts: () => { }
};

const ProductsContext = createContext<productProviderState>(initialState);

export default function useProducts() {
    return useContext(ProductsContext);
}

interface Props {
    children: React.ReactNode;
}


export function ProductsProvider({ children }: Props) {
    const [products, setProducts] = useState<productCardType[]>([]);
    const [totalProducts, setTotalProducts] = useState<number>(0)
    return (
        <ProductsContext.Provider value={{ products, setProducts, totalProducts, setTotalProducts }}>
            {children}
        </ProductsContext.Provider>
    );
}
