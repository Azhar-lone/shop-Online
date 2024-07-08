import { body } from "express-validator";

const validateChangeRole = [
  body("role")
    .exists()
    .withMessage("role is required")
    .isIn(["user", "seller", "buyer", "admin", "moderator"])
    .withMessage("Invalid role"),
];
export { validateChangeRole };
