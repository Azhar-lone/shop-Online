import { param } from "express-validator"

let userInfoValidation = [
    param("username")
        .exists().withMessage("invalid url userName is required")
        .isSlug().withMessage("userName should be slug invalid userName")
        .isString().withMessage("invalid string : userName")
        .trim().escape()

]

export default userInfoValidation
