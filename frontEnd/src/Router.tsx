import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom"


// importing Layouts
import RootLayout from "./Layouts/RootLayout"
import AdminLayout from "./Layouts/AdminLayout"

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
    General,
    AboutUs,

    // Admin
    AdminHome

} from "../pages/exportPages"

let Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="" element={<AdminHome />} />
                <Route path="general" element={<General />} />

            </Route>

            <Route path="/" element={<RootLayout />}>
                <Route path="" element={<Home />} />
                <Route path="aboutus" element={<AboutUs />} />
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