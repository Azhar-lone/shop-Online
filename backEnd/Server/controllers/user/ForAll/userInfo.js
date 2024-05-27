import userModel from "../../../model/userModel.js"

export default async function userInfo(req, res) {
  try {
    //this userName should be Url freindly must
    //change it to slug
    let { username } = req.params
    let user = await userModel.findOne({ userName: username })

    if (!user) {
      return res.status(404).json({
        msg: 'user Not found',
      })
    }
    res.status(200).json({
      user: user,
      msg: "user info retrevied successfully",
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'internal server error',
    })
  }
}
