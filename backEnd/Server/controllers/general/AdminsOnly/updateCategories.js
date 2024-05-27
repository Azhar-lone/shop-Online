// importing Models
import categoryModel from "../../../model/categoryModel.js"

export default async function updateCategories(req, res) {
    try {
        let arrayOfCategories = req.body.categories
        // use array methods to add to categories array 
        // an array
        // push array to array
        let categories = await categoryModel
            .find()
            .select("categories")
        if (categories) {
            // some improvements required here
            categories.push(...arrayOfCategories)
            let newCategories = await categories.save()
            if (newCategories) {
                return res.status(200).json({

                })
            }
            else {
                return res.status(404).json({
                    msg: "failed to update categories array"
                })
            }
        }
        else {
            return res.status(404).json({
                msg: "failed to update categories array"
            })
        }


    }
    catch (error) {
        return res.status(500).json({
            msg: "internal server erorr"
        })
    }
}