//importing dependencies

// Importing Models
import productModel from "../../../model/productModel.js"

export default async function buyProduct(req, res) {
    try {




    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}