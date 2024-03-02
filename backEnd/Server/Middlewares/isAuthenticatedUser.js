
export default function isAuthenticatedUser(req, res, next) {
    try {
        if (req.cookie.login) {
            //use jwt.verify to decoded
            const userId = jwt.verify(req.cookie.login, process.env.JWT_KEY)
            if (userId) {
                req.userId = userId
                return next()
            }
            else {
                return res.status(401).json({
                    msg: "Not autherized user"
                })
            }
        }
        else {
            return res.status(401).json({
                msg: "not authenticated"
            })
        }

    } catch (error) {
        return res.status(500).json({
            msg: "internal server error",
            error: error//development only
        })
    }
}