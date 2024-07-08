//importing dependencies
import express from "express";

// importing middleWares
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
  getReview,
  getProductReviews,
  getReviewsCount,

  //Admins only
  deleteMultipleReviews,
  //authenticated users Only
  addReview,
  likeProduct,
  //owners Only
  deleteProduct,
  updateProduct,
} from "../controllers/review/reviewExports.js";

//initializing Router Strict routing enabled
const reviewRouter = express.Router({ strict: true });

export default reviewRouter;
