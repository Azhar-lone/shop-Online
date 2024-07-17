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
  getReply,
  // getReviewsCount,

  //authenticated users Only
  //owners Only
  addReply,
  deletereply,
  updateReply,
} from "../controllers/replyReview/replyExports.js";

// Importing Validations
import {
  // general validations
  validateId,
  // reply Review
  addReplyValidations,
  updateReplyValidation,
} from "../validations/exportValidations.js";

//initializing Router Strict routing enabled
const replyReviewRouter = express.Router({ strict: true });

// Public
replyReviewRouter.get("/:id", validateId, validationError, getReply);

// users
replyReviewRouter.use(UserAuth);

replyReviewRouter
  .post("/:id", addReplyValidations, validateId, validationError, addReply)
  .delete("/:id", validateId, validationError, deletereply)
  .put("/:id", validateId, updateReplyValidation, validationError, updateReply);

// Admins
replyReviewRouter.use(AdminAuthorized);

export default replyReviewRouter;
