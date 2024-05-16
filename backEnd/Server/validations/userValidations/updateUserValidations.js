import { body } from "express-validator"




const updateUserValidation = [

    // email
    body("email")
        .optional()
        .isEmail().withMessage("not a valid email"),
    // .isWhitelisted(allowedDomains).withMessage("not allowed domain"),
    // old password
    body("oldPassword")
        .exists().withMessage("old password is required")
        .trim()
        .isStrongPassword().withMessage("not A strong password")
        // .isLength({ max: 16 }).withMessage("not a valid length")
        .escape(),
    // new passowrd
    body("newPassword")
        .optional()
        .trim()
        // .isLength({ max: 16 }).withMessage("not a valid length")
        .escape(),

    // confirm new passowrd
    body("confirmNewPassword")
        .optional()
        .trim()
        // .isLength({ max: 16 }).withMessage("not a valid length")
        .escape(),
    // name
    body("name")
        .optional()
        .isString().withMessage("not a valid string")
        .isLength({ max: 20 }).withMessage("not a valid length")
        .escape(),

    // DOB
    body("DOB")
        .optional()
        .escape(),

    // .isDate().withMessage("not a valid date")
]
export default updateUserValidation
