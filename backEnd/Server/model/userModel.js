import mongoose from "mongoose"


const schema = mongoose.Schema({

    firstName: {
        type: String,
        min: 5,
        max: 12
    },
    lastName: {
        type: String,
        min: 5,
        max: 12
    },
    userName: {
        type: String,
        min: 5,
        max: 14,
        required: true

    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        max: 16,
        required: true,
        select: false
    },
    phoneNumber: {
        type: Number,
        length: 11,
        unique: true
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "productModel"
    }],
    cartItems: [{
        type: mongoose.Types.ObjectId,
        ref: "productModel"
    }],
    country: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        // required:false,//only dataBase admin can change this feild
        //only admins should be able to change this feild
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }


})

const userModel = mongoose.model("userModel", schema)
export default userModel
