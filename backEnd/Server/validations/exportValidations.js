//User validations
import signUpValidation from "./user/signUpValidations.js";
import loginValidation from "./user/loginValidations.js";
import updateUserValidation from "./user/updateUserValidations.js";
import userInfoValidation from "./user/userInfo.js";

//database Validations
import validateId from "./database/mongoIdValidation.js";

// product Validations
import updateProductValidation from "./product/updateProduct.js";
import addProductValidation from "./product/addProduct.js";


// general validations
import paginationValidation from "./general/paginationValidation.js";

export {
    //  user validations
    signUpValidation,
    loginValidation,
    updateUserValidation,
    userInfoValidation,

    // database Validations
    validateId,

    // product validations
    updateProductValidation,
    addProductValidation,

    // general validations
    paginationValidation,
}
