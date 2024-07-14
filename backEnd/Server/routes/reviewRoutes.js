//importing dependencies
import express from "express";

// importing middleWares
import {
  AdminAuthorized,
  UserAuth,
  validationError,
} from "../middlewares/auth.js";

//importing Controllers
import {
  //for All
  // getReview,
  getProductReviews,
  getAverageRating,
  // getReviewsCount,

  //Admins only
  // deleteMultipleReviews,
  //authenticated users Only
  addReview,
  isAllowedToAddReview,
  // likeProduct,
  //owners Only
  // deleteProduct,
  // updateProduct,
} from "../controllers/review/reviewExports.js";

// Importing Validations
import {
  // general validations
  paginationValidation,
  validateId,
  // Review
  addReviewValidation,
} from "../validations/exportValidations.js";

//initializing Router Strict routing enabled
const reviewRouter = express.Router({ strict: true });

// Public
reviewRouter
  .get(
    "/",
    paginationValidation,
    validateId,
    validationError,
    getProductReviews
  )
  .get("/average-rating/", validateId, validationError, getAverageRating);

// users
reviewRouter.use(UserAuth);

reviewRouter.post(
  "/:id",
  isAllowedToAddReview,
  addReviewValidation,
  validateId,
  validationError,
  addReview
);

// Admins
reviewRouter.use(AdminAuthorized);

export default reviewRouter;
