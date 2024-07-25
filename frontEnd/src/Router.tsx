import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// importing Layouts
import RootLayout from "./Layouts/RootLayout";
// import AdminLayout from "./Layouts/AdminLayout"
import UserProtected, { NoLoginProtected } from "./Layouts/UserProtected";

// components
import ErrorPage from "@/components/myUi/Error";

// importing Pages
import {
  // importing Auth
  Login,
  Signup,
  ForgotPassword,
  VerifyCode,

  // importing full Pages
  Home,
  ProfilePage,
  AllProducts,
  SettingsPage,
  CartPage,
  AboutUs,
  ProductDetail,
  UploadProduct,
  // Admin
  // AdminHome,
  // AddBlog,
  // General,
} from "@/pages/exportPages";

let Router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route
        path="/login"
        element={
          <NoLoginProtected>
            <Login />
          </NoLoginProtected>
        }
      />
      <Route
        path="/signup"
        element={
          <NoLoginProtected>
            <Signup />
          </NoLoginProtected>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <NoLoginProtected>
            <ForgotPassword />
          </NoLoginProtected>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <NoLoginProtected>
            <VerifyCode />
          </NoLoginProtected>
        }
      />

      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<Home />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path=":username" element={<ProfilePage />} />
        <Route path="products">
          <Route path="" element={<AllProducts />} />
          <Route path=":id" element={<ProductDetail />} />
          <Route path="upload" element={<UploadProduct />} />
        </Route>
        <Route
          path="settings"
          element={
            <UserProtected>
              {" "}
              <SettingsPage />
            </UserProtected>
          }
        />
        <Route
          path="cart"
          element={
            <UserProtected>
              <CartPage />
            </UserProtected>
          }
        />
      </Route>
    </Route>
  )
);
ProfilePage;

export default Router;
