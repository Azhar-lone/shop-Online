import mongoose from "mongoose"


// min can be minLength
const schema = mongoose.Schema({
    slug: {
        type: [String, "slug must be string"],
        unique: [true, "slug must be unique"],
        required: [true, "slug is required"],
        min: [5, "slug must be atleast 5 charactors long"],
        max: [80, "slug must be maximax 80 charactors long"]

    }






}, { timestamps: true })

const blogModel = mongoose.model("blogModel", schema)
export default blogModel
