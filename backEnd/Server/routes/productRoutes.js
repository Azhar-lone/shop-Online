//importing dependencies
import express from "express";

//importing middleWares
import {
  AdminAuthorized,
  UserAuth,
  isSeller,
  isBuyer,
  validationError,
} from "../middlewares/auth.js";

//importing Controllers
import {
  //for All
  getProduct,
  getAllProducts,
  getProductsCount,
  //Admins only
  deleteMultipleProducts,
  updateMultipleProducts,

  //authenticated users Only
  addProduct, // uploadProduct_multer,
  buyProduct,
  getUsersProducts,
  likeProduct,
  //owners Only
  deleteProduct,
  updateProduct,
} from "../controllers/product/productsExport.js";

//importing Validations
import {
  validateId,
  updateProductValidation,
  addProductValidation,
  paginationValidation,
} from "../validations/exportValidations.js";

//initializing Router
const productRouter = express.Router({ strict: true });

//Routes that everyOne can access
productRouter
  .get("/count", getProductsCount) //done
  .get("/:id", validateId, validationError, getProduct)
  .get("/", paginationValidation, validationError, getAllProducts)
  .get(
    "/user/:id",
    validateId,
    paginationValidation,
    validationError,
    getUsersProducts
  );

//Routes Only authenticated user can access
productRouter.use(UserAuth);

productRouter
  .patch("/like/:id", validateId, validationError, likeProduct)
  .patch("/buy/:id", isBuyer, buyProduct)

  .post("/", isSeller, addProductValidation, validationError, addProduct);

//Routes only owners can access
productRouter
  .route("/:id", validateId, validationError)
  .delete(deleteProduct)
  .put(updateProductValidation, validationError, updateProduct); //small problem here

//Routes for admins of webSite only
productRouter.use(AdminAuthorized);
productRouter
  .delete("admin/multiple", deleteMultipleProducts)
  .put("admin/multiple", updateMultipleProducts);
export default productRouter;
