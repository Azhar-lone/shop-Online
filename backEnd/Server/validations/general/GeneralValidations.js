import { body } from "express-validator"


let aboutusValidation = [
    body("aboutUs")
        .optional()
        .isString().withMessage("not a valid string")
        .escape(),
    body("ourMembers")
        .optional()
        .isObject({ strict: true }).withMessage("not a valid object"),
    body("newOurTeam")
        .optional()
        .isObject({ strict: true }).withMessage("not a valid object"),
    body("oldIndex")
        .optional()
        .isInt({ gt: -1 }).withMessage("not a valid index")
]



let countriesValidation = [
    body("country")
        .exists().withMessage("country is required")
        .isString().withMessage("not a valid string")
        .escape().trim()
]
let categoriesValidation = [
    body("categories")
        .exists().withMessage("category is required")
        .isString().withMessage("not a valid string")
        .escape().trim()
]
export { aboutusValidation, countriesValidation, categoriesValidation }