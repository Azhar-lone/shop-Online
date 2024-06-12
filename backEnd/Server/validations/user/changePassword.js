import { body } from "express-validator"

let changePasswordValidation = [
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
        .escape()
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error("new password and confirm new password did'nt match")
            }
            return true
        }),
]

export default changePasswordValidation