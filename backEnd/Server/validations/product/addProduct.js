import { body } from "express-validator"




const addProductValidation = [

    // email
    body("name")
        .exists().withMessage("product Name is required")
        .isString().withMessage("not a valid Name")
        .isLength({ max: 30 }).withMessage("not a valid length")
        .escape(),
    // .isWhitelisted(allowedDomains).withMessage("not allowed domain"),
    // old password
    body("discription")
        .exists().withMessage("product discription is required")
        .isString().withMessage("not A valid discription")
        .escape(),
    // new passowrd
    body("category")
        .exists().withMessage("product category is required")
        .isString().withMessage("not a vlid category")
        .isLength({ max: 30 }).withMessage("not a valid length")
        .escape(),

    // confirm new passowrd
    body("price")
        .exists().withMessage("product price is required")
        .isNumeric().withMessage("not a valid price")
        .isLength({ min: 0, max: 1000 }).withMessage("not a valid lenght")
        .escape(),
    // name
    body("inStock")
        .exists().withMessage("product inStock is required")
        .isNumeric().withMessage("not a valid in stock")
        .escape(),
    //Images 
    body("images")
        .exists().withMessage("images not uploaded")
        .isArray({ max: 5, min: 1 }).withMessage("images should be 1 to 5 limit")



]
export default addProductValidation
