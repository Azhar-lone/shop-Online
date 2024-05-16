import userModel from "../../../model/userModel.js"
export default async function allUsersInfo(req, res) {
  try {
    let users = await userModel.find()
    if (!users) {
      return res.status(404).json({
        msg: 'no Users found',
      })
    }
    res.status(200).json({
      users: users,
      msg:"user fetched successfully"
    })
  } catch (error) {
    res.status(500).json({
      msg: 'internal server error',
      error: error.message
    })
  }
}