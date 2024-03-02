//importing dependencies


//Importing Models
import userModel from "../../../../Models/userModel.js"





export default async function updateAccount(req, res) {
    try {
        const id = req.userId

        //dont allow normal users to change accountType feild
        if (req.body.isAdmin ) {
            req.body.isAdmin = false;
        }

        const user = await userModel.findByIdAndUpdate(id, {
            ...req.body
        })//very insecure i think
        if (user) {
            return res.status(200).json({
                msg: "user account updated successfully",
            })
        }
        return res.status(404).json({
            msg: "error while updating account"
        })
    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}
