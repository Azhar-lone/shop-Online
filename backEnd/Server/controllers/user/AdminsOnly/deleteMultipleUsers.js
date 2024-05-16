import userModel from "../../../model/userModel.js";
export default function deleteMultipleUsers(req, res) {
  try {
    let { arrayOfUsersId } = req.body

    arrayOfUsersId.forEach(async userId => {
      await userModel.findByIdAndDelete(userId)
    })
    res.status(200).json({
      msg: 'users Deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      msg: 'internal server error',
      error: error.message
    })
  }
}