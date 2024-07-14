// public
import getProductReviews from "./public/getProductReviews.js";
import getAverageRating from "./public/getAvgRating.js";
// user
import addReview, { isAllowedToAddReview } from "./user/owner/addReview.js";

export {
  // public
  getProductReviews,
  getAverageRating,
  //   user
  addReview,
  isAllowedToAddReview,
};
