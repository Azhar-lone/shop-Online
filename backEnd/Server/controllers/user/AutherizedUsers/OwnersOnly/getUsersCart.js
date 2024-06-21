import userModel from "../../../../model/userModel.js"

export default async function getUsersCart(req, res) {
    try {

        const limit = req.query.limit || 20
        const pageNumber = req.query.page || 1

        const cart = await userModel
            .findById(req.currentUserId)
            .select("cartItems -_id")
            .populate("name price _id imgs[0] ")
            .limit(limit)
            .skip((pageNumber - 1) * limit)

        cart.cartItems.cart.addedOn = cart.cartItems.addedOn

        if (cart) {
            return res.status(200).json({
                cart: cart.cartItems.cart

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