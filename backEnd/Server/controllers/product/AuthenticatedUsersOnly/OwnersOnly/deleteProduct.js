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

        const product = await productModel.findById(id)
        if (req.currentUserId !== product.owner) {
            return res.status(401).json({
                msg: "not autherized to perform operation"
            })
        }
        let deleted = await product.delete()

        if (deleted) {
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