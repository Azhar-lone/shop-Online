import userModel from "../../../model/userModel.js"
export default async function allUsersInfo(req, res) {
  try {
    const limit = req.query.limit || 20
    const pageNumber = req.query.page || 1

    let users = await userModel.find()
      .limit(limit)
      .skip((pageNumber - 1) * limit)


    if (!users) {
      return res.status(404).json({
        msg: 'no Users found',
      })
    }
    res.status(200).json({
      users: users,
    })
  } catch (error) {
    res.status(500).json({
      msg: 'internal server error',
      error: error.message
    })
  }
}