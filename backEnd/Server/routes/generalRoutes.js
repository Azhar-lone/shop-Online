//importing dependencies
import express from "express"



// importing Middlewares
import { AdminAuthorized, UserAuth, validationError } from "../middlewares/auth.js"


//importing Controllers
import {
    // public
    getCountries,
    getAboutus,
    // Admins
    createGeneral,
    updateCountries,
    updateCategories,
    updateAboutus,
    getGeneral,
    deleteCountry,
}
    from "../controllers/general/generalExports.js"

// validations
import { countriesValidation, categoriesValidation, aboutusValidation } from "../validations/exportValidations.js"



//initializing Router Strict routing enabled
const generalRouter = express.Router({ strict: true })



// public Routes
generalRouter
    .get("/countries", getCountries)
    .get("/aboutus", getAboutus)


generalRouter
    .use(UserAuth)

// Admins only routes
generalRouter
    .use(AdminAuthorized)
    .post("/admin/", createGeneral)
    .get("/admin/", getGeneral)

    .put("/admin/countries", countriesValidation, validationError, updateCountries)
    .post("/admin/aboutus", aboutusValidation, validationError, updateAboutus)
    .put("/admin/categories", categoriesValidation, validationError, updateCategories)

    .delete("/admin/countries", deleteCountry)
// .delete("/admin/categories")
// .delete("/admin/aboutus")



export default generalRouter