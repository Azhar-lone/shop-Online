//importing dependencies
import express from "express"


//importing middleWares
import { AdminAuthorized, UserAuth, validationError } from "../middlewares/auth.js"
//importing Controllers

import {
    //for All
    getProduct,
    getAllProducts,

    //Admins only
    deleteMultipleProducts,
    updateMultipleProducts,

    //authenticated users Only
    addProduct, uploadProduct_multer,
    buyProduct,
    getUsersProducts,
    likeProduct,
    //owners Only
    deleteProduct,
    updateProduct

} from "../controllers/product/productsExport.js"

//importing Validations
import { validateId, updateProductValidation, addProductValidation, paginationValidation } from "../validations/exportValidations.js"

//initializing Router
const productRouter = express.Router({ strict: true })

//Routes that everyOne can access
productRouter
    .get(":id", validateId, validationError, getProduct)
    .get("", paginationValidation, validationError, getAllProducts)

//Routes Only authenticated user can access
// productRouter.use(UserAuth)

productRouter
    .post("/",
        uploadProduct_multer.array("images", 5),
        addProductValidation, validationError,
        addProduct)//TODO
    .patch("like/:id", validateId, validationError, likeProduct)
    .patch("buy/:id", buyProduct)
    .get("user/:id", validateId, paginationValidation, validationError, getUsersProducts)

//Routes only owners can access
productRouter
    .route(":id", validateId, validationError)
    .delete(deleteProduct)
    .put(updateProductValidation, validationError, updateProduct)//small problem here

//Routes for admins of webSite only
productRouter.use(AdminAuthorized)
productRouter
    .delete("admin/multiple", deleteMultipleProducts)
    .put("admin/multiple", updateMultipleProducts)
export default productRouter