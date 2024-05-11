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
    ProfilePage,
    AllProducts
} from "../pages/exportPages"

let Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />


            <Route path="/" element={<RootLayout />}>
                <Route path="home" element={<h1>Home</h1>} />
                <Route path="aboutus" element={<>aboutus</>} />
                <Route path=":username" element={<ProfilePage />} />
                <Route path="products" element={<AllProducts/>} />

            </Route>
        </>
    )
)
ProfilePage

export default Router