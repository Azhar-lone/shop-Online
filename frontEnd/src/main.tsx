import React from 'react'
import ReactDOM from 'react-dom/client'
import "@/styles/globals.css"
// components
import { Toaster } from "@/components/ui/toaster"

// importing Router
import { RouterProvider } from "react-router-dom"
import Router from './Router'

// Importing  providers
import { ThemeProvider } from "@/components/context/theme-provider"
import { UserProvider } from './components/context/user-provider'
import { LoadingProvider } from './components/context/loading-provider'
import { ProductsProvider } from "@/components/context/products-provider"



ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <LoadingProvider>
      <ProductsProvider>
        <UserProvider >
          <ThemeProvider>
            <RouterProvider router={Router} />
            < Toaster />
          </ThemeProvider>
        </UserProvider>
      </ProductsProvider>
    </LoadingProvider>
  // </React.StrictMode>,
)