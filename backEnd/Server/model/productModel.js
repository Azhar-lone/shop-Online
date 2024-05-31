import mongoose from "mongoose"

const schema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        min: 30,
        max: 250,
        required: true,



    },
    category: {
        type: String,
        required: true

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,


    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        unique: [true, "alreadyLiked"],
    }],

    price: {
        type: Number,
        default: 0,
    },
    images: [{
        type: String,
        required: true
    }],
    timeStamp: {
        type: Date,
        default: Date.now()
    },
    // if inStock =0 then outOfStock
    inStock: {
        type: Number,
        default: 1,

    },



})


const productModel = mongoose.model("productModel", schema)
export default productModel
