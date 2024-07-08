// For All
import signUp from "./ForAll/signUp.js";
import login from "./ForAll/login.js";
import userInfo from "./ForAll/userInfo.js";
import sendOTP from "./ForAll/sendOTP.js";
// Autherized Users Only
import logout from "./AutherizedUsers/logout.js";
import follow from "./AutherizedUsers/follow.js";
import uploadProfile from "./AutherizedUsers/uploadProfile.js";

// Owners Only
import deleteUser from "./AutherizedUsers/OwnersOnly/deleteUser.js";
import updateUser from "./AutherizedUsers/OwnersOnly/updateUser.js";
import getUsersCart from "./AutherizedUsers/OwnersOnly/getUsersCart.js";
import changePassword from "./AutherizedUsers/OwnersOnly/changePassword.js";
// Admins Only
import allUsersInfo from "./AdminsOnly/allUsersInfo.js";
import deleteMultipleUsers from "./AdminsOnly/deleteMultipleUsers.js";
import changeUserRole from "./AdminsOnly/changeUserRole.js";

export {
  // For All
  signUp,
  login,
  userInfo,
  sendOTP,
  // Autherized Users Only
  logout,
  follow,
  uploadProfile,
  // Owners Only
  deleteUser,
  updateUser,
  getUsersCart,
  changePassword,
  // Admins Only
  allUsersInfo,
  deleteMultipleUsers,
  changeUserRole,
};
