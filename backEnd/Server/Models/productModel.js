import mongoose from "mongoose"

const schema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
    },
    category: {
        type: String,

    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        unique: true,
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,

    },
    price: {
        type: Number,
        default: 0,
    },
    images: [{
        type: String
    }],
    timeStamp: {
        type: Date,
        default: Date.now()
    },
    inStock: {
        type: Number,
    },
    //if stockstatus=false then outofstock
    stockStatus: {
        type: Boolean,
        default: true,
    },


})


const productModel = mongoose.model("productModel", schema)
export default productModel
