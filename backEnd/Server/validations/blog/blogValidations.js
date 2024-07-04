import { param, body } from "express-validator"

let validateSlug = [
    param("slug")
        .isSlug().withMessage("not a valid slug")
        .escape().trim(),


]

let validateCreateBlog = [
    body("slug")
        .exists().withMessage("slug is required")
        .isSlug().withMessage("not a valid slug")
        .escape().trim(),
    body("blog")
        .exists().withMessage("blog is required")
        .isString().withMessage("blog should be string")
]



export {
    validateSlug,
    validateCreateBlog
}