// Importing dependencies
import express from "express";

// Importing controllers
import {
  // For All
  signUp,
  login,
  userInfo,
  sendOTP,
  // Autherized Users Only
  logout,
  // follow,
  uploadProfile,
  // uploadProfile_multer,
  // Owners Only
  deleteUser,
  updateUser,
  getUsersCart,
  changePassword,
  // Admins Only
  allUsersInfo,
  deleteMultipleUsers,
} from "../controllers/user/userExports.js";

//Importing Middlewares
import {
  AdminAuthorized,
  UserAuth,
  validationError,
  verifyOTP,
  verifyPassword,
} from "../middlewares/auth.js";

// Importing Validations
import {
  signUpValidation,
  loginValidation,
  updateUserValidation,
  userInfoValidation,
  emailValidation,
  OTPValidations,
  changePasswordValidation,
  // general validations
  paginationValidation,
  // database Validations
} from "../validations/exportValidations.js";

// Initializing Router in Strict Mode
const userRouter = express.Router({ strict: true });

// Public routes=For All
userRouter
  .post("/signup", signUpValidation, validationError, signUp) //done
  .post("/login", loginValidation, validationError, verifyPassword, login) //done
  .get("/:username", userInfoValidation, validationError, userInfo) //done
  .post("/send-otp", emailValidation, validationError, sendOTP) //TODO
  .post(
    "/forgot-password",
    OTPValidations,
    emailValidation,
    validationError,
    verifyOTP,
    login
  );

// Routes requiring user authentication
// Autherized Users Only
userRouter
  .use(UserAuth)
  .post("/logout", logout) //done
  .post(
    "/upload-profile", //uploadProfile_multer.single("image"),
    uploadProfile
  ) //Todo

  // Owners Only
  .delete(
    "/delete",
    loginValidation,
    OTPValidations,
    validationError,
    verifyPassword,
    verifyOTP,
    deleteUser
  ) //done
  .put("/update", updateUserValidation, validationError, updateUser) //done
  .get("/cart", paginationValidation, validationError, getUsersCart) //TODO
  .put(
    "/change-password",
    changePasswordValidation,
    validationError,
    changePassword
  );

// Routes accessible only to admins
userRouter
  .use(AdminAuthorized)
  .delete("admin/multiple", deleteMultipleUsers) //done
  .get("admin/all", paginationValidation, validationError, allUsersInfo); //done

export default userRouter;
