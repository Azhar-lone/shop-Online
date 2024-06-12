import mongoose from "mongoose"

const schema = mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    reviewOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel",
    },
    reviewBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviewModel"
    }]
}, { timestamps: true })


const reviewModel = mongoose.model("reviewModel", schema)
export default reviewModel