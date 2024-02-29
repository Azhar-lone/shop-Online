//importing dependencies

import userModel from "../../Models/userModel"

// import userModel from "../../Models/userModel"


// import Models
// import userModel from "../../Models/userModel.js"
/*
*@params req=httpRequest
*/

export default async function deleteAccount(req, res) {
    try {
        const id = req.userId
        const user = await userModel.findByIdAndDelete(id)
        if (user) {
            return res.status(200).cookie("login", "", {
                maxAge: Date.now(),
            }).json({
                msg: "user deleted successfully",
            })
        }
        return res.status(404).json({
            msg: "error while deleting account"
        })
    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}