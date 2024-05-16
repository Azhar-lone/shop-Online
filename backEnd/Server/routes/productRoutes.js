//importing dependencies
import express from "express"


//importing middleWares
import { AdminAuthorized, UserAuth, validationError } from "../middlewares/auth.js"
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

} from "../controllers/product/productsExport.js"

//importing Validations
import { validateId } from "../validations/exportValidations.js"

//initializing Router
const productRouter = express.Router({ strict: true })

//Routes that everyOne can access
productRouter
    .get(":id", validateId, validationError, getProduct)

//Routes Only authenticated user can access
productRouter.use(UserAuth)

productRouter
    .post("", addProduct)
    .patch("like/:id", validateId, validationError, likeProduct)
    .patch("buy/:id", buyProduct)
    .get("userproducts/:id", validateId, validationError, getUsersProducts)

//Routes only owners can access
productRouter
    .route(":id", validateId, validationError)
    .delete(deleteProduct)
    .put(updateProductValidations,updateProduct)

//Routes for admins of webSite only
productRouter.use(AdminAuthorized)
productRouter
    .get("admin/all", getAllProducts)
    .delete("admin/multiple", deleteMultipleProducts)
    .put("admin/multiple", updateMultipleProducts)
export default productRouter