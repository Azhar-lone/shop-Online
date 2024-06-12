import { body } from "express-validator"


let emailValidation = [
    body("email")
        .exists().withMessage("email is required")
        .isEmail().withMessage("not a valid email")
        .escape()
        .trim()


]





let OTPValidations = [
    body("otp")
        .exists().withMessage("otp is not present")
        .isInt({ gt: 0, lt: 999999 }).withMessage("not a valid opt")
        .escape()
        .trim()
]



export { emailValidation, OTPValidations }