// importing Models
import countriesModel from "../../../model/generalModels/countriesModel.js"

export default async function getCountries(req, res) {
    try {

        let countries = await countriesModel
            .find()
            .select("country -_id")
        console.log(req.url,"sdgone")

        if (countries) {
            return res.status(200).json({
                msg: "countries fetched successfully",
                countries: countries
            })
        }
        return res.status(404).json({
            msg: "error while fetching coutries"
        })



    }
    catch (error) {
        return res.status(500).json({
            msg: "internal server erorr"
        })
    }
}