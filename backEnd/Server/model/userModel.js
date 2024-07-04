import mongoose from "mongoose"
import path from "path"

const schema = mongoose.Schema({

    firstName: {
        type: String,
        min: 5,
        max: 12,
        required: true,
    },
    lastName: {
        type: String,
        min: 5,
        max: 12,
        required: true,

    },
    userName: {
        type: String,
        min: 5,
        max: 14,
        required: true,
        unique: true

    },
    email: {
        type: String,
        unique: true,
        select: false
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
        select: false
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "productModel",
        // select: false

    }],
    cartItems: [{
        cart: {
            type: mongoose.Types.ObjectId,
            ref: "productModel",
            // select: false
        },

        addedOn: {
            type: Date,
            default: new Date(),
            select: false
        }
    }],
    followers: [{
        type: mongoose.Types.ObjectId,
        ref: "userModel"
    }],
    following: [{
        type: mongoose.Types.ObjectId,
        ref: "userModel"
    }],
    country: {
        type: String,
    },
    profilePic: {
        type: String,
        default: path.normalize(
            path.resolve('Backend/Files/static/profile.png')
        )

    }
    ,
    role: {
        type: String,
        enum: ["user", "seller", "buyer", "admin", "moderator"],
        default: "user",

        // required:false,//only dataBase admin can change this feild
        //only admins should be able to change this feild
    },




}, { timestamps: true })

const userModel = mongoose.model("userModel", schema)
export default userModel
