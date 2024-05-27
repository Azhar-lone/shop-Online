import { check } from "express-validator"

const loginValidation = [
    // email 
    check("email")
        .optional()
        .isEmail().withMessage("not a valid email"),
    // phoneNumber 
    check("phoneNumber")
        .optional()
        .isMobilePhone().withMessage("not a valid phone Number"),

    check("password")
        .exists().withMessage("password is required")
        .trim()
        .isStrongPassword().withMessage("not correct password")
        .escape()
]
export default loginValidation
