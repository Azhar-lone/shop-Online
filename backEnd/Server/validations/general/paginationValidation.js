import { query } from "express-validator"

let paginationValidation = [

    query("limit")
        .optional()
        .isInt({ lt: 30, gt: 8 }).withMessage("invalid query {limit}")
        .trim().escape()


    ,
    query("page")
        .optional()
        .isInt({ gt: 0 }).withMessage("invalid query {page}")
        .trim().escape()


]

export default paginationValidation