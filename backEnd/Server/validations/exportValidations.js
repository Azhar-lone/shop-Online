//User validations
import signUpValidation from "./user/signUpValidations.js";
import loginValidation from "./user/loginValidations.js";
import updateUserValidation from "./user/updateUserValidations.js";
import userInfoValidation from "./user/userInfo.js";
import { emailValidation, OTPValidations } from "./user/otpValidations.js";

import changePasswordValidation from "./user/changePassword.js";

//database Validations
import validateId from "./database/mongoIdValidation.js";

// product Validations
import updateProductValidation from "./product/updateProduct.js";
import addProductValidation from "./product/addProduct.js";

// blog validations
import { validateSlug, validateCreateBlog } from "./blog/blogValidations.js";

// general validations
import paginationValidation from "./general/paginationValidation.js";
import { categoriesValidation, aboutusValidation, countriesValidation } from "./general/GeneralValidations.js";


export {
    //  user validations
    signUpValidation,
    loginValidation,
    updateUserValidation,
    userInfoValidation,
    emailValidation,
    OTPValidations,
    changePasswordValidation,

    // database Validations
    validateId,

    // product validations
    updateProductValidation,
    addProductValidation,

    // blog Validations
    validateSlug,
    validateCreateBlog,
    // general validations
    paginationValidation,
    categoriesValidation,
    aboutusValidation,
    countriesValidation,
}
