//importing for All
import signUp from "./ForAll/signUp.js"
import logIn from "./ForAll/logIn.js"
import getUser from "./ForAll/getUser.js"
import forgotPassword from "./ForAll/forgotPassword.js"

//importing AdminsOnly
import deleteMultiple from "./AdminsOnly/deleteMultiple.js"
import getAllUsers from "./AdminsOnly/getAllUsers.js"
import updateMultiple from "./AdminsOnly/updateMultiple.js"

//importing authenticated Users only
import logout from "./AuthenticatedUsersOnly/logout.js"

//import owners only
import updateAccount from "./AuthenticatedUsersOnly/OwnersOnly/updateAccount.js"
import deleteAccount from "./AuthenticatedUsersOnly/OwnersOnly/deleteAccount.js"

export {
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

}