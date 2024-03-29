//importing dependencies


// Importing Models
import productModel from "../../../Models/productModel.js"



export default async function likeProduct(req, res) {
    try {

        const id = req.params.id
        const product = await productModel.findByIdAndUpdate(id, { "$push": { likedBy: id } })
        if (product) {
            return res.status(200).json({
                msg: "product fetched successfully",
                product: product
            })
        }
        else {
            return res.status(404).json({
                msg: "failed to create product"
            })
        }

    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}