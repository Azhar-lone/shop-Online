//importing dependencies

// Importing Models
import productModel from "../../../Models/productModel.js"




export default async function getUsersProducts(req, res) {
    try {
        const id = req.params.id
        const limit = req.query.limit
        const pageNumber = req.query.pageNumber

        const products = await productModel
            .find({ owner: id })
            .sort({ timeStamp: -1 })
            .limit(limit)
            .skip((pageNumber - 1) * limit)

        if (products) {
            return res.status(200).json({
                msg: "product fetched successfully",
                products: products
            })
        }
        return res.status(404).json({
            msg: "product not Found"
        })


    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}