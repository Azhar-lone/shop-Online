import { body } from "express-validator"




const updateProductValidation = [

    // email
    body("name")
        .optional()
        .isString().withMessage("not a valid Name")
        .isLength({ max: 20 }).withMessage("not a valid length")
        .escape(),
    // .isWhitelisted(allowedDomains).withMessage("not allowed domain"),
    // old password
    body("discription")
        .optional()
        .isString().withMessage("not A valid discription")
        .isLength({ max: 250, min: 30 }).withMessage("not a valid length")
        .escape(),
    // new passowrd
    body("category")
        .optional()
        .isString().withMessage("not a vlid category")
        .isLength({ max: 30 }).withMessage("not a valid length")
        .escape(),

    // confirm new passowrd
    body("price")
        .optional()
        .isNumeric().withMessage("not a valid price")
        .isLength({min:0,max:1000}).withMessage("not a valid lenght")
        .escape(),
    // name
    body("inStock")
        .optional()
        .isNumeric().withMessage("not a valid in stock")
        .isLength({ max: 20 }).withMessage("not a valid length")
        .escape(),

   

]
export default updateProductValidation
