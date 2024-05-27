// importing Models
import categoryModel from "../../../model/categoryModel.js"

export default async function getCategories(req, res) {
    try {

        let categories = await categoryModel
            .find()
            .select("categories")
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