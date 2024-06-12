// Importing dependencies


// Importing Models
import generalModel from "../../../model/generalModel.js"

export default async function getAboutus(req, res) {

    try {

        const aboutUs = await generalModel.find().select("aboutUs -_id")
        if (aboutUs) {
            return res.status(200).json({
                msg: "about us fetched successfully",
                aboutus: aboutUs
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