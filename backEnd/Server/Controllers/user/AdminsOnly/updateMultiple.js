// Not A Valid Route

// importing dependencies

// Imorting models 
import userModel from "../../../Models/userModel.js"


export default function updateMultiple(req, res) {
    try {

        const { userIds } = req.body

        //both limit and page number should be positive
        userIds.forEach(async (userId) => {
            await userModel.findByIdAndUpdate(userId, {

            })
        });
        return res.status(200).json({
            msg: "updation successfull"
        })

    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}