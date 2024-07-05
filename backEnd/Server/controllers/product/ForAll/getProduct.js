//importing dependencies

// Importing Models
import productModel from "../../../model/productModel.js"



export default async function getProduct(req, res) {
    try {
        const id = req.params.id

        const product = await productModel.findById(id)
            .select({})

        if (product) {
            return res.status(200).json({
                product: product
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