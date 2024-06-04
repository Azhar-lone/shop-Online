import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator"

import userModel from '../model/userModel.js'
const { sign, verify } = jwt
export function createToken(id) {
  let token = sign({ id }, process.env.UserSecretKey)
  return token
}

export async function AdminAuthorized(req, res, next) {
  try {
    const admin = await userModel.findById(req.currentUserId)
      .select("isAdmin -_id")
    console.log(admin)
    if (admin.isAdmin) {
      // req.user=admin
      return next()
    } else
      return res.status(401).json({
        msg: 'only admins can perform this operation'
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'internal server errors'
    })
  }
}

// export function isOwner(req, res, next) {

//   try {

//     const { id } = req.params

//     if (req.currentUserId !== id) {
//       return res.status(401).json({
//         msg: "Not authorized",
//         success: false,
//       })
//     }
//     return next()

//   } catch (error) {
//     return res.status(500).json({
//       msg: "internal server error",
//       success: false,
//       error: error
//     })
//   }


// }

export function UserAuth(req, res, next) {
  try {


    if (req.cookies.login) {
      let decoded = verify(req.cookies.login, process.env.UserSecretKey)

      if (decoded) {
        //decode login cookies and extract user's Id and send it to frontEnd
        //as currentUserId which will be used to specify OwnerShip and ...
        req.currentUserId = decoded.id
        return (next())
      } else {
        return res.status(401).json({
          msg: 'Not authorized'
        })
      }
    } else {
      return res.json({
        msg: 'Operation not Allowed'
      })
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Authentication error :",

    })
  }
}

export function validationError(req, res, next) {
  try {
    const errors = validationResult(req)
    // console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(401).json({
        msg: errors.array({ onlyFirstError: true })[0].msg
      })
    }

    return next()

  }
  catch (error) {
    res.status(500).json({
      msg: "validation error :" + error.message,
    })
  }
}

export async function verifyOTP(req, res, next) {

  try {

    const { email, otp } = req.body

    let user = await userModel.findOne({ email }).select("email -_id")

    const isValid = false
    // find otp with 


    if (isValid) {
      return next()
    }
    res.status(401).json({
      msg: "invalid OTP"
    })

  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "internel server error",

    })
  }

} 