//importing dependencies


// Importing Models
import productModel from "../../../model/productModel.js"
import userModel from "../../../model/userModel.js"


export default async function likeProduct(req, res) {
    try {

        const id = req.params.id
        // add id to likes 
        const product = await productModel.findByIdAndUpdate(id, { "$push": { likedBy: id } })
        
        const user = await userModel.findByIdAndUpdate(id, { "$push": { cartItems: id } })
        
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