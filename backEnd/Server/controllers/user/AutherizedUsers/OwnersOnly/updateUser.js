import userModel from '../../../../model/userModel.js'
import bcrypt from "bcrypt"
//problems in this function
export default async function updateUser(req, res) {
  try {

    let { email, oldPassword, newPassoword, confirmNewPassword, firstName, lastName, userName } = req.body

    // Find user by id and select password
    // dont select id
    const user = await userModel.findById(req.currentUserId).select("password -_id")
    if (!user) {
      return res.status(401).json({
        msg: "failed to verify old password try again"
      })
    }
    let isMatched = await bcrypt.compare(oldPassword, user.password)
    if (!isMatched) {
      return res.status(401).json({
        msg: "wrong old Password",
      })
    }
    let updatedUser = await userModel.findByIdAndUpdate(req.currentUserId,
      {
        email,
        oldPassword,
        newPassoword,
        confirmNewPassword,
        firstName,
        lastName,
        userName
      },
      { new: true })//return updated document
    if (updateUser) {
      return res.status(200).json({
        msg: "user info updated",
        updatedUser: updatedUser
      })
    }
    return res.status(401).json({
      msg: "failed to update user info"
    })


  } catch (error) {

    return res.status(500).json({
      msg: "internal server error"
    })

  }










}
