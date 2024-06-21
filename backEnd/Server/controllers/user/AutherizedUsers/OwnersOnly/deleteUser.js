import userModel from "../../../../model/userModel.js"
export default async function deleteUser(req, res) {
  try {

    //use date functions to pospond user deletion operation
    //and suspend user's acount until he loggs in again with in
    //specified time
    let user = await userModel.findByIdAndDelete(req.currentUserId).select("userName -_id")

    if (!user) {
      return res.status(404).json({
        msg: 'user not Found',
      })
    }

  

    res.cookie("login", "", {
      httpOnly: true,
      secure: true,
      sameOrigin: 'none'
    }).status(200).end()

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'internal server error',
    })
  }
}
