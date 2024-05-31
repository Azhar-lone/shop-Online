import React from 'react'
import ReactDOM from 'react-dom/client'
import "../app/globals.css"

// importing Router
import { RouterProvider } from "react-router-dom"
import Router from './Router'

// Importing  providers
import { ThemeProvider } from "@/components/context/theme-provider"
import { UserProvider } from './components/context/user-provider'
import { LoadingProvider } from './components/context/loading-provider'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingProvider>
      <UserProvider >
        <ThemeProvider>
          <RouterProvider router={Router} />
        </ThemeProvider>
      </UserProvider>
    </LoadingProvider>
  </React.StrictMode>,
)
