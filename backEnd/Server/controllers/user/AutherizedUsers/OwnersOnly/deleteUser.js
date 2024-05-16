import userModel from "../../../../model/userModel.js"

export default async function deleteUser(req, res) {
  try {

    //use date functions to pospond user deletion operation
    //and suspend user's acount until he loggs in again with in
    //specified time

    let user = await userModel.findByIdAndDelete(req.currentUserId)

    if (!user) {
      return res.status(404).json({
        msg: 'user not Found',
      })
    }

    //suspend here

    // //timers here
    // if ((Date.now() + 30, 'days' == true)) {
    //   await user.delete() //or remove
    //   res.status(200).json({
    //     msg: 'user deleted sucessfully',
    //   })
    //   user.isSuspended = true
    //   await user.save()
    // }
    res.cookie("login", "", {
      httpOnly: true,
      secure: true,
      sameOrigin: 'none'
    }).status(200).json({
      msg: "acount deleted successfully"
    })

    //delete here
  } catch (error) {
    return res.status(500).json({
      msg: 'internal server error',
      error: error,
    })
  }
}
