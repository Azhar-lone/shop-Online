import mongoose, { Mongoose } from "mongoose"
import path from "path"

const schema = mongoose.Schema({
    // title: {
    //     type: String,
    //     default: "About us"
    // },
    features: [String],
    ourTeam: [{
        memberName: {
            type: String
        },
        memberPic: {
            type: String,
            default: path.resolve("Files/static/profile.png")
        },
        memberRole: {
            type: String,
            default: "member"
        },
        links: [String]
        // } || {
        //     type: Mongoose.Schema.Types.ObjectId,
        //     ref: "userModel",
    }]
})

const AboutUsModel = mongoose.model("AboutUsModel", schema)
export default AboutUsModel