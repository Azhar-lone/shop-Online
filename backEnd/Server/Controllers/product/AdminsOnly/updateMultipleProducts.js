//importing dependencies

// Importing models
import productModel from "../../../Models/productModel.js"


export default async function updateMultipleProducts(req, res) {
    try {




    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}