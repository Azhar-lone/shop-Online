import { check } from "express-validator"
const userInfoValidation = [
    // username
    check("username")
        .isSlug().withMessage("unexpected user name")
        .escape().trim()
]
export default userInfoValidation