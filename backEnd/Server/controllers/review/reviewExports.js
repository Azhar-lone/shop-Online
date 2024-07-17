// public
import getProductReviews from "./public/getProductReviews.js";
import getAverageRating from "./public/getAvgRating.js";

// user
import addReview, { isAllowedToAddReview } from "./user/owner/addReview.js";
import likeReview from "./user/likeReview.js";

// owner
import deleteReview from "./user/owner/deleteReview.js";
import updateReview from "./user/owner/updateReview.js";
export {
  // public
  getProductReviews,
  getAverageRating,
  //   user
  addReview,
  isAllowedToAddReview,
  likeReview,
  // owner
  deleteReview,
  updateReview,
};
