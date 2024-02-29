import mongoose from "mongoose"

const schema = mongoose.schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    reviewOf: {

    },
    reviewBy: {

    }
})


const reviewModel = mongoose.model("reviewModel", schema)
export default reviewModel