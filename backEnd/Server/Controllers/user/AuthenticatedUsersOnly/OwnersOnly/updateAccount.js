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



        const user = await userModel.findById(id)
        if (user) {

// change userObject here

            await user.save()
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
