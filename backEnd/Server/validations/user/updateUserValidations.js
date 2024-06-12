import { body } from "express-validator"




const updateUserValidation = [

    // email
    body("email")
        .optional()
        .isEmail().withMessage("not a valid email"),
    // .isWhitelisted(allowedDomains).withMessage("not allowed domain"),
    // name
    body("userName")
        .optional()
        .isString().withMessage("not a valid string")
        .isLength({ max: 20 }).withMessage("not a valid length")
        .escape(),
    // firstName
    body("firstName")
        .optional()
        .isString().withMessage("not a valid string")
        .isLength({ max: 12 }).withMessage("not a valid length")
        .escape(),
    body("lastName")
        .optional()
        .isString().withMessage("not a valid string")
        .isLength({ max: 12 }).withMessage("not a valid length")
        .escape(),


]
export default updateUserValidation
