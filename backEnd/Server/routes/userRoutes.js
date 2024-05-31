// Importing dependencies
import express from 'express'

// Importing controllers
import {
    // For All
    signUp,
    login,
    userInfo,
    forgetPassword,
    // Autherized Users Only
    logout,
    // follow,
    uploadProfile,
    uploadProfile_multer,
    // Owners Only
    deleteUser,
    updateUser,
    getUsersCart,
    // Admins Only
    allUsersInfo,
    deleteMultipleUsers
} from '../controllers/user/userExports.js'

//Importing Middlewares 
import { AdminAuthorized, UserAuth, validationError } from '../middlewares/auth.js'

// Importing Validations
import {
    signUpValidation,
    loginValidation,
    updateUserValidation,
    userInfoValidation,

    // general validations
    paginationValidation,
    // database Validations

} from "../validations/exportValidations.js"

// Initializing Router in Strict Mode
const userRouter = express.Router({ strict: true })

// Public routes=For All
userRouter
    .post('/signup',
        signUpValidation,
        validationError,
        signUp)
    .post('/login',
        loginValidation,
        validationError,
        login)
    .post("/forget-password", forgetPassword)//TODO

    .get("/:username",
        userInfoValidation,
        validationError,
        userInfo)

// Routes requiring user authentication
// Autherized Users Only
userRouter
    .use(UserAuth)
    .post('/logout', logout)
    .post('/upload/profilepic',
        uploadProfile_multer.single("profileImg"),
        uploadProfile)//TODO:90% done 10% remain

    // Owners Only
    .delete("/delete", deleteUser)
    .put("/update", updateUserValidation, validationError, updateUser)
    .get("/cart", paginationValidation, validationError, getUsersCart)

// Routes accessible only to admins
userRouter
    .use(AdminAuthorized)
    .delete('admin/deletemultiple', deleteMultipleUsers)
    .get('admin/allusers', paginationValidation, validationError, allUsersInfo)

export default userRouter
