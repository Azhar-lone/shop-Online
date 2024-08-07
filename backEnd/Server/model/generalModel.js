// this model contains all the general settings and parts of website only
// admins can update this and user can only access this

import mongoose from "mongoose";

let schema = mongoose.Schema(
  {
    ourTeam: [
      {
        picture: String,
        name: String,
        role: String,
        links: [String],
        discription: String,
      },
    ],

    // Allowed categories

    productsCategories: [String],
    countries: [String],
  },
  { timestamps: true }
);

let generalModel = mongoose.model("generalModel", schema);
export default generalModel;
