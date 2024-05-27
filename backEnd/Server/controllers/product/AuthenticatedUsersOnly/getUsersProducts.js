//importing dependencies

// Importing Models
import userModel from "../../../model/userModel.js"




export default async function getUsersProducts(req, res) {
    try {
        const id = req.params.id
        const limit = req.query.limit || 10
        const pageNumber = req.query.page || 1


        // go to userModel and find user by given id
        // select product property from that 
        // populate all feileds each product cause it refers 
        // to another model called productModel
        // only select 


        const products = await userModel
            .findById(id)
            .select("products")
            .populate("*")
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