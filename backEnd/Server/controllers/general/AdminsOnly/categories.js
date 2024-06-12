// importing Models
import generalModel from "../../../model/generalModel.js"

export default async function updateCategories(req, res) {
    try {

        const { category } = req.body


        let productsCategories = await generalModel.find().select("productsCategories")
        productsCategories[0].productsCategories.push(category)
        let done = await productsCategories.save()
        if (done) {
            return res.status(200).json({
                msg: "category uploaded"

            })
        }
    }
    catch (error) {
        return res.status(500).json({
            msg: "internal server erorr"
        })
    }
}