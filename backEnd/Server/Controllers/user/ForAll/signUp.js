//importing dependencies




// import Models
import userModel from "../../../Models/userModel.js"


//importing middlewares
import { createToken } from "../../../Middlewares/exportMiddlewares.js"


// import userModel from "../../Models/userModel.js"
/*
*@params req=httpRequest
*/

export default async function signUp(req, res) {
    try {
        const { Name, email, password, confirmPassword, phoneNumber, from, livesIn } = req.body
        //if something is missing 
        //signUpwith email or phoneNumber or include Both
        if (!Name || !password || !confirmPassword || (!email && !phoneNumber)) {
            return res.status(401).json({
                msg: "some feilds are requred"
            })
        }

        if (password !== confirmPassword) {
            return res.status(401).json({
                msg: "password did't matched"
            })
        }
        //if email is provided then search by email else by phoneNumber
        const alreadyUser = await userModel.findOne(email ? email : phoneNumber)

        if (alreadyUser) {
            return res.status(302).json({
                msg: "already a user :email or phone already registered"
            })
        }
        //dont allow normal users to change accountType feild

        if (req.body.isAdmin) {
            req.body.isAdmin = false
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            // Name, email, phoneNumber, password, password, from, livesIn
            ...req.body
        })//create account conditionaly

        if (user) {
            const token = createToken(user._id)
            return res.cookie("login", token, {
                httpOnly: true,
                secure: true,
                // sameSite:"strict"

            }).status(200).json({
                msg: "user created and login successfully",
                userId: user._id
            })
        }
        return res.status(401).json({
            msg: "error while creating user"
        })

    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}
