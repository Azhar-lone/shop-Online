import mongoose from "mongoose"
import path from "path"

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
        unique: true,
        select: false
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "productModel",
        select: false

    }],
    cartItems: [{
        type: mongoose.Types.ObjectId,
        ref: "productModel",
        select: false

    }],
    country: {
        type: String,
    },
    profilePic:{
        type:String,
        default:path.resolve('Backend/Files/static/profile.png')
        
    }
    ,
    isAdmin: {
        type: Boolean,
        default: false,
        select: false,
      
        // required:false,//only dataBase admin can change this feild
        //only admins should be able to change this feild
    },
    timeStamp: {
        type: Date,
        default: Date.now(),
        required: false
    }


})

const userModel = mongoose.model("userModel", schema)
export default userModel
