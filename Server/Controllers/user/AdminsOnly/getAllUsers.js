//importing dependencies

import userModel from "../../Models/userModel.js"

// import userModel from "../../Models/userModel"


// import Models
// import userModel from "../../Models/userModel.js"
/*
*@params req=httpRequest
*/

export default async function getAllUsers(req, res) {
    try {

        const pageNumber = req.query.page
        const limit = req.query.limit
        //both limit and page number should be positive
        const users = await userModel
            .find()
            .limit(limit)
            .skip((pageNumber - 1) * limit)
            .sort({ timeStamp: -1 })

        if (users) {
            return res.status(200).json({
                msg: "users fetched successfully",
                users: users
            })
        }
        return res.status(404).json({
            msg: "users not Found"
        })


    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}