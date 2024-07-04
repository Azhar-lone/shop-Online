// importing Models
import generalModel from "../../../model/generalModel.js"
export default async function getCountries(req, res) {
    try {

        let countries = await generalModel
            .findOne()
            .select("countries -_id")
        if (countries) {
            return res.status(200).json({
                countries: countries.countries
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