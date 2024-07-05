// For All
import getCountries from "./ForAll/getCountries.js";
import getAboutus from "./ForAll/getAboutUs.js";
import getCategories from "./ForAll/getCategories.js";
// // Autherized Users Only
// import { } from "./AutherizedUsersOnly"

// // Owners Only
// import { } from "./AutherizedUsersOnly/OwnersOnly"

// Admins Only
import { updateCountries, deleteCountry } from "./AdminsOnly/countries.js";
import { updateAboutus } from "./AdminsOnly/AboutUs.js";
import createGeneral from "./AdminsOnly/createGeneral.js";
import updateCategories from "./AdminsOnly/categories.js";
import getGeneral from "./AdminsOnly/getGeneral.js";

export {
  // For All

  getCountries,
  getAboutus,
  getCategories,
  // Autherized Users Only

  // Owners Only

  // Admins Only

  // countries
  updateCountries,
  updateAboutus,
  createGeneral,
  updateCategories,
  getGeneral,
  deleteCountry,
};
