// import userModel from "../../../model/userModel"

export default async function forgetPassword(req, res) {
    try {

        const { email, phoneNumber } = req.body

        if (!email && !phoneNumber) {
            return res.status(401).json({
                msg: "email or phone number required"
            })


        }
        if (phoneNumber) {
            // send code to this phone number
            return res.status(500).json({
                msg: "not yet implimented "
            })
        }
        else if (email) {
            // send code to this email
            return res.status(500).json({
                msg: "not yet implimented "
            })
        }


    } catch (error) {
        return res.status(500).json({
            msg: "internal server error"
        })
    }
}
