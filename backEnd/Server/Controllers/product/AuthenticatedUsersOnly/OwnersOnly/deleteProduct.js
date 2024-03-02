//importing dependencies


// import userModel from "../../Models/userModel"


// import Models
// import userModel from "../../Models/userModel.js"
/*
*@params req=httpRequest
*/

export default async function deleteProduct(req, res) {
    try {
        const id = req.params.id

        const product = await productModel.findByIdAndDelete(id)
        if (product) {
            return res.status(200).json({
                msg: "product deleted successfully",
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