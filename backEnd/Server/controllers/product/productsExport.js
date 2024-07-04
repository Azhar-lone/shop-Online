//importing for All
import getProduct from "./ForAll/getProduct.js"
import getAllProducts from "./ForAll/getAllProducts.js"
import getProductsCount from "./ForAll/getProductsCount.js"
//importing AdminsOnly
import deleteMultipleProducts from "./AdminsOnly/deleteMultipleProducts.js"
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
    getAllProducts,
    getProductsCount,
    
    //Admins only
    deleteMultipleProducts,
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