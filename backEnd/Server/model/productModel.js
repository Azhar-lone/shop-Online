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
        select: false


    },
    category: {
        type: String,
        required: true,
        select: false


    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
        select: false


    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    }],

    price: {
        type: Number,
        default: 0,
    },
    images: [{
        type: String,
        required: true
    }],

    // if inStock =0 then outOfStock
    inStock: {
        type: Number,
        default: 1,
        select: false
    },



}, { timestamps: true })


const productModel = mongoose.model("productModel", schema)
export default productModel
