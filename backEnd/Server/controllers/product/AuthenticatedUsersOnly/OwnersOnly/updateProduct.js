//importing dependencies


// import userModel from "../../Models/userModel"


// import Models
// import userModel from "../../Models/userModel.js"
/*
*@params req=httpRequest
*/



export default async function updateProduct(req, res) {
    try {


        const product = await productModel.findByIdAndUpdate(id, {
            // ...req.body
        })
        if (product) {
            return res.status(200).json({
                msg: "product updated successfully",
                product: product
            })
        }
        else {
            return res.status(404).json({
                msg: "failed to update product"
            })
        }



    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}