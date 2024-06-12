// Importing dependencies
import express from 'express'

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
    uploadProfile_multer,
    // Owners Only
    deleteUser,
    updateUser,
    getUsersCart,
    changePassword,
    // Admins Only
    allUsersInfo,
    deleteMultipleUsers
} from '../controllers/user/userExports.js'

//Importing Middlewares 
import {
    AdminAuthorized,
    UserAuth,
    validationError,
    verifyOTP,
    verifyPassword
} from '../middlewares/auth.js'

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

} from "../validations/exportValidations.js"

// Initializing Router in Strict Mode
const userRouter = express.Router({ strict: true })

// Public routes=For All
userRouter
    .post('/signup', signUpValidation, validationError, signUp)
    .post('/login', loginValidation, validationError, verifyPassword, login)
    .post("/send-otp", emailValidation, validationError, sendOTP)//TODO
    .post("/forgot-password", OTPValidations, emailValidation, validationError, verifyOTP, login)
    .get("/:username", userInfoValidation, validationError, userInfo)

// Routes requiring user authentication
// Autherized Users Only
userRouter
    .use(UserAuth)
    .post('/logout', logout)
    //TODO:90% done 10% remain
    .post('/upload/profilepic', uploadProfile_multer.single("profileImg"), uploadProfile)

    // Owners Only
    .delete("/delete", OTPValidations, emailValidation, validationError, verifyOTP, deleteUser)
    .put("/update", OTPValidations, updateUserValidation, validationError, updateUser)
    .get("/cart", paginationValidation, validationError, getUsersCart)
    .post("/change-password", changePasswordValidation, validationError, changePassword)

// Routes accessible only to admins
userRouter
    .use(AdminAuthorized)
    .delete('admin/deletemultiple', deleteMultipleUsers)
    .get('admin/allusers', paginationValidation, validationError, allUsersInfo)

export default userRouter
