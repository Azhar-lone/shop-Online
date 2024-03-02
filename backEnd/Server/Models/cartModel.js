import mongoose from "mongoose"


const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel"
    }]

})

const cartModel = mongoose.model("cartModel", schema)
export default cartModel