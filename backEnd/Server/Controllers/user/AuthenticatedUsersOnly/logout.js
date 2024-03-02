
export default async function logout(req, res) {
    try {
       return res.status(200).cookie("login", "", {
            maxAge: 0,
            expires: Date.now()
        }).json({
            msg: "logout Successfully"
        })
    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}