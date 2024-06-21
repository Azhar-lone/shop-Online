import { param,body } from "express-validator"

let validateSlug = [
    param("slug")
        .isSlug().withMessage("not a valid slug")
        .escape().trim()

]

let validateCreateBlog=[
    body("slug")
    .isSlug().withMessage("not a valid slug")
    .escape().trim()
]



export {
    validateSlug,
    validateCreateBlog
}