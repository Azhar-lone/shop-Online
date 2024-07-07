import { body } from "express-validator";

let aboutusValidation = [
  body("aboutUs")
    .optional()
    .isString()
    .withMessage("not a valid string")
    .escape(),
  body("ourMembers")
    .optional()
    .isObject({ strict: true })
    .withMessage("not a valid object"),
  body("newOurTeam")
    .optional()
    .isObject({ strict: true })
    .withMessage("not a valid object"),
  body("oldIndex")
    .optional()
    .isInt({ gt: -1 })
    .withMessage("not a valid index"),
];

let countriesValidation = [
  body("countries")
    .exists()
    .withMessage("countries is required")
    .isArray({ min: 1 })
    .withMessage("empty countries array")
    .custom((value) => {
      // Check if all elements in the array are strings
      if (!Array.isArray(value)) {
        throw new Error("countries must be an array");
      }
      for (const country of value) {
        if (typeof country !== "string") {
          throw new Error("all elements in countries array must be strings");
        }
      }
      return true;
    })
    .escape()
    .trim(),
];

export default countriesValidation;

let categoriesValidation = [
  body("categories")
    .exists()
    .withMessage("category is required")
    .isString()
    .withMessage("not a valid string")
    .escape()
    .trim(),
];
export { aboutusValidation, countriesValidation, categoriesValidation };
