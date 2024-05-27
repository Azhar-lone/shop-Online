// Importing dependencies


// Importing Models
import AboutUsModel from "../../../model/aboutUsModel.js"

export default async function getAboutUs(req, res) {

    try {

        const aboutUs = await AboutUsModel.find()
        if (aboutUs) {
            return res.status(200).json({
                msg: "about us fetched successfully",
                aboutUs: aboutUs
            })
        }
        return res.status(404).json({
            msg: "not Found"
        })

    } catch (error) {
        return res.status(500).json({
            msg: "internal Server Error"
        })
    }
}