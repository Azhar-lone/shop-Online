//importing dependencies

import userModel from "../../Models/userModel.js"

// import userModel from "../../Models/userModel"


// import Models
// import userModel from "../../Models/userModel.js"
/*
*@params req=httpRequest
*/

export default async function getUser(req, res) {
    try {
        const id = req.params.id

        const user = await userModel.findById(id)
        if (user) {
            return res.status(200).json({
                msg: "user fetched successfully",
                user: user
            })
        }
        return res.status(404).json({
            msg: "user not Found"
        })


    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}