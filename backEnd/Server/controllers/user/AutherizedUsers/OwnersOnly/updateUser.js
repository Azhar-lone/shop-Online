import userModel from '../../../../model/userModel.js'
import bcrypt from "bcrypt"
import fs from "fs"
import { resolve } from 'path'
//problems in this function
export default async function updateUser(req, res) {
  try {

    let { email, oldPassword, newPassoword, firstName, lastName, userName } = req.body

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
    const found = await userModel.findOne({ "$or": [{ email }, { userName }] }).select("-_id userName")

    if (found) {
      return res.status(401).json({
        msg: "userName or email or both already in use"
      })
    }


    let updatedUser = await userModel.findByIdAndUpdate(req.currentUserId,
      {
        email,
        password: newPassoword,
        firstName,
        lastName,
        userName
      },
      { new: true })//return updated document
    // rename users folder before responsing
    fs.rename(resolve("/Files/", found.userName), resolve("/Files/", updatedUser.userName), (err) => {
      if (err) {
        console.log(err)
      }
    })

    if (updatedUser) {
      return res.status(200).json({
        msg: "user info updated",
        updatedUser: updatedUser
      })
    }
    return res.status(401).json({
      msg: "failed to update user info"
    })


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: "internal server error"
    })

  }










}
