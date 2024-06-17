import { redisClient } from "../../../../app"
import crypto from "crypto"
// import otp from "otp-generator"
// import {} from "nodemailer"

export default async function sendOTP(req, res) {
    try {

        const { email } = req.body

        // generate code
        // let OTP = otp.generate(6, { digits: true, lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false })
        const Otp = crypto.randomInt(100000, 1000000)

        let done = await redisClient.hSet("user:otp", email, Otp)
        redisClient.expire("user:otp", 180)
        // valid for 3 minutes

        if (!done) {
            return res.status(401).json({
                msg: "error while sending otp try again"
            })
        }

        // and sent to client in email using node mailer


        return res.status(500).json({
            msg: "not yet implimented ",

        })



    } catch (error) {
        return res.status(500).json({
            msg: "internal server error"
        })
    }
}