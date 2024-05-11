

import React from 'react'
import { Outlet } from "react-router-dom"

// importing pages
import {
    Nav,
    Footer
} from "../../pages/exportPages.js";






const RootLayout: React.FC = () => {
    return (
        <>
            <Nav />
            <Outlet />
            {/* <Footer /> */}
            </>
    )
}

export default RootLayout