import { body } from "express-validator";

const addReviewValidation = [
  // email
  body("review")
    .exists()
    .withMessage("review is required")
    .isString()
    .withMessage("not a valid Name")
    .escape(),
  body("rating")
    .exists()
    .withMessage("rating is required")
    .isInt({ gt: 0, lt: 6 })
    .withMessage("rating should be between 1 and 5")
    .escape(),
];
export default addReviewValidation;
