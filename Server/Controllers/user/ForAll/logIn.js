//importing dependencies

// importing models
// import userModel from "../../Models/userModel"



//importing middlewares
import { createToken } from "../../Middlewares/exportMiddlewares.js"

export default async function logIn(req, res) {
    try {

        const { email, phoneNumber, password } = req.body
        if (!password || (!phoneNumber && !email)) {
            return res.status(401).json({
                msg: "Bad request"
            })
        }
        const user = await userModel.findOne(email ? email : phoneNumber)
        const isSamePassword = await bcrypt.compare(password, user.password)

        if (user && isSamePassword) {
            const token = createToken(user._id)
            return res.cookie("login", token, {
                httpOnly: true,
                secure: true,
                // sameSite:"strict"
            }).status(200).json({
                msg: "login successfully",
                userId: user._id
            })
        }
        return res.status(401).json({
            msg: "error while loggin in"
        })
    }
    catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}