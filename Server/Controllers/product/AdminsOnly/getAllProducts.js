//importing dependencies


// import userModel from "../../Models/userModel"


// import Models
// import userModel from "../../Models/userModel.js"
/*
*@params req=httpRequest
*/

export default async function getAllProduct(req, res) {
    try {

        const limit = req.query.limit
        const pageNumber = req.query.pageNumber

        const products = await productModel
            .find()
            .sort({ timeStamp: -1 })
            .limit(limit)
            .skip((pageNumber - 1) * limit)

        if (products) {
            return res.status(200).json({
                msg: "products fetched successfully",
                products: products
            })
        }
        return res.status(404).json({
            msg: "products not Found"
        })


    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}