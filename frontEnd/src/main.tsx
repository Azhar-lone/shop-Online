import React from 'react'
import ReactDOM from 'react-dom/client'
import "../app/globals.css"

// importing Router
import { RouterProvider } from "react-router-dom"
import Router from './Router'

// Importing  Themes
import { ThemeProvider } from "@/components/context/theme-provider"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={Router} />
    </ThemeProvider>
  </React.StrictMode>,
)
