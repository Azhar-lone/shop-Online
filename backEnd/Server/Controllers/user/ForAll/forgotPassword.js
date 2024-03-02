//importing dependencies

// importing models
import userModel from "../../../Models/userModel.js"



//importing middlewares
import { createToken } from "../../../Middlewares/exportMiddlewares.js"

export default async function forgotPassword(req, res) {
    try {


    }
    catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}