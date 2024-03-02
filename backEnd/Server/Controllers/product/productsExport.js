//importing for All
import getProduct from "./ForAll/getProduct.js"

//importing AdminsOnly
import deleteMultipleProducts from "./AdminsOnly/deleteMultipleProducts.js"
import getAllProducts from "./AdminsOnly/getAllProducts.js"
import updateMultipleProducts from "./AdminsOnly/updateMultipleProducts.js"

//importing authenticated Users only
import addProduct from "./AuthenticatedUsersOnly/addProduct.js"
import buyProduct from "./AuthenticatedUsersOnly/buyProduct.js"
import getUsersProducts from "./AuthenticatedUsersOnly/getUsersProducts.js"
import likeProduct from "./AuthenticatedUsersOnly/likeProduct.js"

//import owners only
import deleteProduct from "./AuthenticatedUsersOnly/OwnersOnly/deleteProduct.js"
import updateProduct from "./AuthenticatedUsersOnly/OwnersOnly/updateProduct.js"

export {
    //for All
    getProduct,

    //Admins only
    deleteMultipleProducts,
    getAllProducts,
    updateMultipleProducts,

    //authenticated users Only
    addProduct,
    buyProduct,
    getUsersProducts,
    likeProduct,
    //owners Only
    deleteProduct,
    updateProduct

}