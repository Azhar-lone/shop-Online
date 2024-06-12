// Importing dependencies

// Importing Models
import generalModel from "../../../model/generalModel.js"

export async function updateAboutus(req, res) {
    try {
        const { aboutUs, ourTeam, newOurTeam, oldIndex } = req.body


        let done = await generalModel.find().select("aboutUs ourTeam")
        done[0].aboutUs = aboutUs
        if (newOurTeam && oldIndex) {
            done[0].ourTeam[oldIndex] = newOurTeam
        }
        done[0].ourTeam.push(ourTeam)
        done = await done[0].save()

        if (done) {
            return res.status(200).json({
                msg: "aboutUs uploaded"

            })
        }
        return res.status(401).json({
            msg: "failed to upload country"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        })
    }

}
