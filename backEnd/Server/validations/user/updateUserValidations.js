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
    // lastName
    body("lastName")
        .optional()
        .isString().withMessage("not a valid string")
        .isLength({ max: 12 }).withMessage("not a valid length")
        .escape(),
    // old password
    body("oldPassword")
        .exists().withMessage("Old password is required")
        .trim()
        .isStrongPassword().withMessage("not A strong password")
        .isLength({ max: 16, min: 8 }).withMessage("not a valid length")
        .escape(),
    // new Password
    body("newPassword")
        .optional()
        .trim()
        .isStrongPassword().withMessage("not A strong password")
        .isLength({ max: 16, min: 8 }).withMessage("not a valid length")
        .escape(),
    // confirm passowrd
    body("confirmNewPassword")
        .optional()
        .trim()
        .escape()
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error("password did'nt match")
            }
            return true
        }),



]
export default updateUserValidation
