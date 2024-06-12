import userModel from '../../../../model/userModel.js'
import bcrypt from "bcrypt"

//problems in this function
export default async function changePassword(req, res) {
    try {

        let { oldPassword, newPassoword } = req.body

        // Find user by id and select password
        // dont select id
        const user = await userModel.findById(req.currentUserId).select("password -_id")
        if (!user) {
            return res.status(401).json({
                msg: "failed to verify old password try again"
            })
        }
        let isMatched = await bcrypt.compare(oldPassword, user.password)
        if (!isMatched) {
            return res.status(401).json({
                msg: "wrong old Password",
            })
        }

        let updatedUser = await userModel.findByIdAndUpdate(req.currentUserId,
            {
                password: newPassoword,
            }).select("_id")

        if (updatedUser) {
            return res.status(200).json({
                msg: "password updated",
            })
        }
        return res.status(401).json({
            msg: "failed to update user password"
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "internal server error"
        })

    }










}
