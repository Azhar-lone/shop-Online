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

  //authenticated users Only
  addReview,
  isAllowedToAddReview,
  likeReview,
  //owners Only
  updateReview,
  deleteReview,
} from "../controllers/review/reviewExports.js";

// Importing Validations
import {
  // general validations
  paginationValidation,
  validateId,
  // Review
  addReviewValidation,
  updateReviewValidation,
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

reviewRouter
  .post(
    "/:id",
    isAllowedToAddReview,
    addReviewValidation,
    validateId,
    validationError,
    addReview
  )
  .put("/like/:id", validateId, validationError, likeReview)
  .delete("/:id", validateId, validationError, deleteReview)
  .put(
    "/:id",
    validateId,
    updateReviewValidation,
    validationError,
    updateReview
  );

// Admins
reviewRouter.use(AdminAuthorized);

export default reviewRouter;
