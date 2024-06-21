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
    .get("/:username", userInfoValidation, validationError, userInfo)
    .post("/send-otp", emailValidation, validationError, sendOTP)//TODO
    .post("/forgot-password", OTPValidations, emailValidation, validationError, verifyOTP, login)

// Routes requiring user authentication
// Autherized Users Only
userRouter
    .use(UserAuth)
    .post('/logout', logout)
    //TODO:90% done 10% remain
    .post('/upload-profile', uploadProfile_multer.single("image"), uploadProfile)

    // Owners Only
    .delete("/delete", loginValidation, OTPValidations, validationError, verifyPassword, verifyOTP, deleteUser)
    .put("/update", updateUserValidation, validationError, updateUser)
    .get("/cart", paginationValidation, validationError, getUsersCart)
    .put("/change-password", changePasswordValidation, validationError, changePassword)

// Routes accessible only to admins
userRouter
    .use(AdminAuthorized)
    .delete('admin/multiple', deleteMultipleUsers)
    .get('admin/all', paginationValidation, validationError, allUsersInfo)

export default userRouter
