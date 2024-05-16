import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom"


// importing Layouts
import RootLayout from "./Layouts/RootLayout"


// importing Pages
import {
    // importing Auth
    Login,
    Signup,
    ForgotPassword,


    // importing full Pages
    Home,
    ProfilePage,
    AllProducts,
    SettingsPage,
    CartPage,
    Dashboard

} from "../pages/exportPages"

let Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />


            <Route path="/" element={<RootLayout />}>
                <Route path="" element={<Home />} />
                <Route path="aboutus" element={<>aboutus</>} />
                <Route path=":username" element={<ProfilePage />} />
                <Route path="products" element={<AllProducts />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="cart" element={<CartPage />} />

            </Route>
        </>
    )
)
ProfilePage

export default Router