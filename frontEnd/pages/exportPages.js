// exporting Auth pages
import Login from "./Login/Login"
import Signup from "./Signup/Signup"
import ForgotPassword from "./ForgotPassword/ForgotPassword"

// importing components of pages
import Nav from "./general/WebComponets/Nav"
import Footer from "./general/WebComponets/Footer"

// importing full pages
import Home from "./Home/Home"
import ProfilePage from "./Profile/ProfilePage"
import AllProducts from "./Products/All-Products"
import SettingsPage from "./Settings/SettingsPage"
import CartPage from "./Cart/CartPage"
import AboutUs from "./Aboutus/AboutUs"

// Admins 
import SideBar from "./AdminPanel/components/sideBar"
import TopBar from "./AdminPanel/components/TopBar"
// Pages
import { AdminHome } from "./AdminPanel/Pages/Home"
import General from "./AdminPanel/Pages/general"

export {
    // exporting Auth pages
    Login,
    Signup,
    ForgotPassword,

    // exporting components of pages
    Home,
    Nav,
    Footer,

    // exporting full pages
    ProfilePage,
    AllProducts,
    SettingsPage,
    CartPage,
    AboutUs,
    // Admin
    TopBar,
    SideBar,
    // pages
    AdminHome,
    General



}