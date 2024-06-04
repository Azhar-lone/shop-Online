// For All
import getCountries from "./ForAll/getCountries.js"
import getAboutus from "./ForAll/getAboutUs.js"
// // Autherized Users Only
// import { } from "./AutherizedUsersOnly"


// // Owners Only
// import { } from "./AutherizedUsersOnly/OwnersOnly"


// Admins Only
import { updateCountries, addCountries } from "./AdminsOnly/countries.js"
import { updateAboutus, addAboutus } from "./AdminsOnly/AboutUs.js"

export {
    // For All

    getCountries,
    getAboutus,
    // Autherized Users Only

    // Owners Only

    // Admins Only

    // countries
    updateCountries,
    addCountries,
    addAboutus,
    updateAboutus,

}
