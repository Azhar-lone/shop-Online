//User validations
import signUpValidation from "./userValidations/signUpValidations.js";
import userInfoValidation from "./userValidations/userInfoValidation.js";
import loginValidation from "./userValidations/loginValidations.js";
//database Validations
import validateId from "./databaseValidations/mongoIdValidation.js";

// book Validations
// import validateGetAllBooks from "./bookValidations/validateGetAllBooks.js";
// import validateUploadBook from "./bookValidations/validateUploadBook.js";

// review Validations
// import addReviewValidation from "./reviewValidations/addReviewValidation.js";


// Search Validations
// import queryValidations from "./searchValidations/    queryValidations.js";


// About Us Validations
// import validateAboutUs from "./aboutUsValidations/validateAboutUs.js";
export {
    //  user validations
    signUpValidation,
    userInfoValidation,
    loginValidation,

    // database Validations
    validateId,

    // book validations
    // validateGetAllBooks,
    // validateUploadBook,
    // review Validations
    // addReviewValidation,
    // Search Validations
    // queryValidations,
    // About Us Validations
// validateAboutUs,
}
