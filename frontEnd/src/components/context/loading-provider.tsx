import React, { createContext, useContext, useState } from 'react';



interface loadingContextState {
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void
}

const initialState: loadingContextState = {
    isLoading: false,
    setIsLoading: () => { }
}
let loadingContext = createContext<loadingContextState>(initialState)


export default function useLoading() {

    return useContext(loadingContext)
}

interface loadingProps {
    children: React.ReactNode;
}

export function LoadingProvider({ children }: loadingProps) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    return (
        <loadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </loadingContext.Provider>
    )

}



