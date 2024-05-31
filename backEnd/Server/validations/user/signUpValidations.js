import { body } from "express-validator"

const allowedDomains = [
    'test.com',
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'yahoo.com',
    'icloud.com',
    'protonmail.com',
]



const signUpValidation = [

    // email
    body("email")
        .optional()
        .isEmail().withMessage("not a valid email"),
    // .isWhitelisted(allowedDomains).withMessage("not allowed domain"),
    // password
    // phoneNumber
    body("phoneNumber")
        .optional()
        .isMobilePhone().withMessage("not a valid phone Number")
        .trim().escape(),
    body("password")
        .exists().withMessage("password is required")
        .trim()
        .isStrongPassword().withMessage("not A strong password")
        // .isLength({ max: 16 }).withMessage("not a valid length")
        .escape(),

    // confirm passowrd
    body("confirmPassword")
        .exists().withMessage("confirm password is required")
        .trim()
        // .isLength({ max: 16 }).withMessage("not a valid length")
        .escape(),
    // first name
    body("firstName")
        .exists().withMessage("first name is required")
        .isString().withMessage("not a valid string")
        .isLength({ max: 12 }).withMessage("not a valid length")
        .escape().trim(),

    // last name
    body("lastName")
        .exists().withMessage("last name is required")
        .isString().withMessage("not a valid string")
        .isLength({ max: 12 }).withMessage("not a valid length")
        .escape(),
    // user name
    body("userName")
    .exists().withMessage("userName is required")
    .isString().withMessage("not a valid string")
    .isLength({ max: 16 }).withMessage("not a valid length")
    .isSlug().withMessage("not a valid userName")
    .escape(),
    // Country
    body("country")
        .exists().withMessage("country is required")
        .isString().withMessage("not a valid string")
        .isLength({ max: 30 }).withMessage("not a valid length")
        .escape().trim(),

]
export default signUpValidation
