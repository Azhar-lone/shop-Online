import userModel from "../../../../model/userModel.js"

export default async function getUsersCart(req, res) {
    try {

        const limit = req.query.limit ||20
        const pageNumber = req.query.page||1

        const cart = await userModel
            .findById(req.currentUserId)
            .select("cartItems")
            .populate("*")
            .limit(limit)
            .skip((pageNumber - 1) * limit)

        if (cart) {
            return res.status(200).json({
                msg: "user cart data fetched successfully",
                cart: cart
            })
        }
        return res.status(404).json({
            msg: "nothing in the cart"
        })
    } catch (error) {
        res.status(500).json({
            msg: 'internal server erorr',
            error: error.message
        })
    }

}