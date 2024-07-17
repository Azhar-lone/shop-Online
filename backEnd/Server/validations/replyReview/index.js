import { body } from "express-validator";

export const addReplyValidations = [
  body("reply")
    .exists()
    .withMessage("reply is required")
    .isString()
    .withMessage("reply should be string")
    .escape(),
];

export const updateReplyValidation = [
  body("reply")
    .optional()
    .isString()
    .withMessage("reply should be string")
    .escape(),
];
