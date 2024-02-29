import mongoose from "mongoose"

const schema = mongoose.schema({

    Name: {
        type: String,
        min: 5,
        max: 16
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        max: 16,
        required: true
    },
    phoneNumber: {
        type: Number,
        length: 11,
        unique: true
    },
    from: {
        type: String,
    },
    livesIn: {
        type: String
    },
    accountType: {
        type: String,
        default: "user"
        //only admins should be able to change this feild
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }


})

const userModel = mongoose.model("userModel", schema)
export default userModel