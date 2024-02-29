//importing dependencies


// import userModel from "../../Models/userModel"


// import Models
// import userModel from "../../Models/userModel.js"
/*
*@params req=httpRequest
*/

export default async function getProduct(req, res) {
    try {
        const id = req.params.id

        const product = await productModel.findById(id)
        if (product) {
            return res.status(200).json({
                msg: "product fetched successfully",
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