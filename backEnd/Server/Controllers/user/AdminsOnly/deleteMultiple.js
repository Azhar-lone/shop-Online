//importing dependencies


// Importing models
import userModel from "../../../Models/userModel.js"

export default function deleteMultiple(req, res) {
    try {

        const { userIds } = req.body

        userIds.forEach(async (userId) => {
            await userModel.findByIdAndDelete(userId)
        });
        return res.status(200).json({
            msg: "deletion successfull"
        })

    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}