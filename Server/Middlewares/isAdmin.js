export default async function isAdmin(req, res, next) {
    try {
        const user = await userModel.findById(req.userId)
        if (user) {

            if (user.accountType === "admin") {
                return next()
            }
            else {
                //write request info to some log file

                return res.status(401).json({
                    msg: "Not autherized"

                })
            }
        }
        else {
            return res.status(404).json({
                msg: "unexpected error occured probably user Not found"
            })
        }

    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error: error//development only
        })
    }
}