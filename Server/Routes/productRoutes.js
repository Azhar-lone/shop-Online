//importing dependencies
import express from "express"


//importing middleWares
import { isAuthenticatedUser, isAdmin }
    from "../Middlewares/exportMiddlewares.js"

//importing Controllers

import {
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

} from "../Controllers/product/productsExport.js"

//importing Validations
import { idValidation } from "../Validations/exportValidations.js"

//initializing Router
const productRouter = express.Router({ strict })

//Routes that everyOne can access
productRouter
    .get(":id", idValidation, getProduct)

//Routes Only authenticated user can access
productRouter.use(isAuthenticatedUser)

productRouter
    .post("add", addProduct)
    .patch("like/:id", idValidation, likeProduct)
    .patch("buy/:id", buyProduct)
    .get("userproducts/:id", idValidation, getUsersProducts)

//Routes only owners can access

productRouter
    .route(":id")
    .use(idValidation)
    .delete(deleteProduct)
    .put(updateProduct)

//Routes for admins of webSite only
productRouter.use(isAdmin)
productRouter
    .get("admin/getall", getAllProducts)
    .delete("admin/deletemultiple", deleteMultipleProducts)
    .put("admin/updatemultiple", updateMultipleProduct)
export default productRouter