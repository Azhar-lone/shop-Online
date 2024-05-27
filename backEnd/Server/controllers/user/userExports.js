// For All
import signUp from "./ForAll/signUp.js"
import login from "./ForAll/login.js"
import userInfo from "./ForAll/userInfo.js"
import forgetPassword from "./ForAll/forgetPassword.js"

// Autherized Users Only
import logout from "./AutherizedUsers/logout.js"
import follow from "./AutherizedUsers/follow.js"
import uploadProfile,{uploadProfile_multer} from "./AutherizedUsers/uploadProfile.js"

// Owners Only
import deleteUser from "./AutherizedUsers/OwnersOnly/deleteUser.js"
import updateUser from "./AutherizedUsers/OwnersOnly/updateUser.js"
import getUsersCart from "./AutherizedUsers/OwnersOnly/getUsersCart.js"

// Admins Only
import allUsersInfo from "./AdminsOnly/allUsersInfo.js"
import deleteMultipleUsers from "./AdminsOnly/deleteMultipleUsers.js"

export {
  // For All
  signUp,
  login,
  userInfo,
  forgetPassword,
  // Autherized Users Only
  logout,
  follow,
  uploadProfile,
  uploadProfile_multer,
  // Owners Only
  deleteUser,
  updateUser,
  getUsersCart,
  // Admins Only
  allUsersInfo,
  deleteMultipleUsers
}