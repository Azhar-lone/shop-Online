//importing dependencies


// import userModel from "../../Models/userModel"


// import Models
// import userModel from "../../Models/userModel.js"
/*
*@params req=httpRequest
*/



export default async function addProduct(req, res) {
    try {


        const product = await productModel.create({
// ...req.body
        })
        if (product) {
            return res.status(200).json({
                msg: "product created successfully",
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