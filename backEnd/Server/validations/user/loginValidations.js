import { check } from "express-validator"

const loginValidation = [
    // email 
    check("email")
        .exists().withMessage("email is required")
        .isEmail().withMessage("not a valid email"),
    check("password")
        .exists().withMessage("password is required")
        .trim()
        .isStrongPassword().withMessage("not correct password")
        .escape()
]
export default loginValidation
