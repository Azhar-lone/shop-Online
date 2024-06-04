import mongoose from "mongoose";

const countriesSchema = mongoose.Schema({
    country: {
        type: String,
        required: true, // Enforce presence of country names
        unique:true
    }
});

const countriesModel = mongoose.model("CountriesModel", countriesSchema);
export default countriesModel;
