//importing dependencies
import express from "express"


//importing middleWares
import { isAdmin, isAuthenticatedUser } from "../Middlewares/exportMiddlewares.js"

//importing Controllers
import {
    //for All
    signUp,
    logIn,
    getUser,
    forgotPassword,

    //Admins only
    deleteMultiple,
    getAllUsers,
    updateMultiple,

    //authenticated users Only
    logout,

    //owners Only
    updateAccount,
    deleteAccount

} from "../Controllers/user/userControllers.js"

//importing Validations
import { idValidation } from "../Validations/exportValidations.js"


//initializing Router
const userRouter = express.Router({ strict: true })



//Routes that everyOne can access
userRouter
    .post("signUp", signUp)
    .post("login", logIn)
    .get(":id", idValidation, getUser)
    .post("forgotpassword", forgotPassword)

//Routes Only authenticated user can access
userRouter.use(isAuthenticatedUser)
userRouter
    // .put("follow/:id", followUser)//both follow and unfollow
    // .put("uploadprofile", uploadProfile)
    .post("logout", logout)
//Routes only owners of account can access
userRouter
    .delete("delete", deleteAccount)
    .put("update", updateAccount)

//Routes for admins of webSite only
userRouter.use(isAdmin)
userRouter
    .get("/admin/getallusers", getAllUsers)
    .delete("/admin/deletemultiple", deleteMultiple)
    .put("/admin/updatemultiple", updateMultiple)//this can be used to add admins too
// .patch("/admin/addadmin", addAdmin)

export default userRouter

//1-you should be loggedin in order to loggedOut
//2-you should be owner of account to update or 
//delete account
//3-admins have full control over website