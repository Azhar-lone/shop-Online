//importing dependencies


// Importing Models
import productModel from "../../../model/productModel.js"
import userModel from "../../../model/userModel.js"


export default async function likeProduct(req, res) {
    try {

        const id = req.params.id
        // add id to likes 


        // if not iside product
        const user = await userModel.findById(req.currentUserId).select("cartItems")
        // if not liked already add like
        if (!user.cartItems.contain(id)) {
            const product = await productModel.findByIdAndUpdate(id, { "$push": { likedBy: req.currentUserId } }, { new: true })
                .select("-_id likedBy")
            if (product) {
                user.cartItems.push(id)
                let savedUser = await user.save().select("-_id cartItems")
                return res.status(200).json({
                    product: product,
                    user: savedUser
                })
            }
            else {
                return res.status(404).json({
                    msg: "failed to create product"
                })
            }
        }
        // if liked already then remove like

        if (user.cartItems.contain(id)) {
            const product = await productModel.findByIdAndUpdate(id, { "$pop": { likedBy: req.currentUserId } }, { new: true })
                .select("-_id likedBy")
            if (product) {
                user.cartItems.pop(id)
                let savedUser = await user.save().select("-_id cartItems")
                return res.status(200).json({
                    msg: "product liked  successfully",
                    product: product,
                    user: savedUser
                })
            }
            else {
                return res.status(404).json({
                    msg: "failed to create product"
                })
            }
        }


    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}