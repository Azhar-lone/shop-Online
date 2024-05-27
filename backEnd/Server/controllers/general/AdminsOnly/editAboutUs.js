// Importing dependencies


// Importing Models
import AboutUsModel from "../../../model/aboutUsModel.js"

export default async function editAboutUs(req, res) {

    try {

        const { features, ourTeam } = req.body
        // ourTeam = []

        ourTeam.forEach(object => {
        });

        const aboutUs = await AboutUsModel.create({

        })
        if (aboutUs) {
            return res.status(200).json({
                msg: "about us upadted successfully",
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