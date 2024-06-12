// importing Models
import generalModel from "../../../model/generalModel.js"

export default async function getCategories(req, res) {
    try {

        let categories = await generalModel.find().select("productsCategories -_id")
        if (categories) {
            return res.status(200).json({
                msg: "categories fetched successfully",
                categories: categories
            })
        }
        return res.status(404).json({
            msg: "error while fetching categories"
        })



    }
    catch (error) {
        return res.status(500).json({
            msg: "internal server erorr"
        })
    }
}