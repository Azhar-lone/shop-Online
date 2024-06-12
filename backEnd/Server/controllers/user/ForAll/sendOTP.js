
export default function sendOTP(req, res) {
    try {

        const { email } = req.body


        // generate code

        // store code with this email in redis dataBase 
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