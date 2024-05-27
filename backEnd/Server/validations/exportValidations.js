//User validations
import signUpValidation from "./user/signUpValidations.js";
import userInfoValidation from "./user/userInfoValidation.js";
import loginValidation from "./user/loginValidations.js";
import updateUserValidation from "./user/updateUserValidations.js";
//database Validations
import validateId from "./database/mongoIdValidation.js";

// product Validations
import updateProductValidation from "./product/updateProduct.js";



// general validations
import paginationValidation from "./general/paginationValidation.js";

export {
    //  user validations
    signUpValidation,
    userInfoValidation,
    loginValidation,
    updateUserValidation,

    // database Validations
    validateId,

    // product validations
    updateProductValidation,

    // general validations
    paginationValidation,
}
