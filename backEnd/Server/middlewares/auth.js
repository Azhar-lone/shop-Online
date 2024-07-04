import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { validationResult } from "express-validator"
import userModel from '../model/userModel.js'

import { redisClient } from './redisConnection.js'


const { sign, verify } = jwt
export function createToken(id) {
  let token = sign({ id }, process.env.UserSecretKey)
  return token
}

export async function AdminAuthorized(req, res, next) {
  try {
    const admin = await userModel.findById(req.currentUserId)
      .select("role -_id")
    if (admin && admin.role === "admin") {
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



// user will be seller if his/her shop and identity is verified

export async function isSeller(req, res, next) {
  try {
    const seller = await userModel.findById(req.currentUserId)
      .select("role -_id")
    if (seller && seller.role === "seller") {
      return next()
    } else
      return res.status(401).json({
        msg: 'only sellers can perform this operation'
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'internal server errors'
    })
  }
}


// user will be buyer if his/her payment is verified
export async function isBuyer(req, res, next) {
  try {
    const buyer = await userModel.findById(req.currentUserId)
      .select("role -_id")
    if (buyer && buyer.role === "buyer") {
      return next()
    } else
      return res.status(401).json({
        msg: 'only buyers can perform this operation'
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'internal server errors'
    })
  }
}


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

// this functions check if provided otp is correct or not 
export async function verifyOTP(req, res, next) {

  try {

    const { email, otp } = req.body
    // find otp with  this email in redis database
    let found = await redisClient.hGet("user:otp", email)
    if (!found) {
      return res.status(401).json({
        msg: "invalid OTP"
      })
    }


    if (found.email === email && found.otp === otp) {
      const user = await userModel.findOne({ email }).select('userName')
      req.user = user
      return next()
    }
    return res.status(401).json({
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

// this function checks provided password is correct or not
export async function verifyPassword(req, res, next) {
  try {


    // Extract email and password from the request body
    const { email, password } = req.body

    // Find user by email or phoneNumber and select password
    // dont select id
    let user = await userModel.findOne({ email }).select('password userName')

    // If user is not found, return a 401 Unauthorized response
    if (!user) {
      return res.status(404).json({
        msg: 'User not found',
      })
    }
    // Compare the provided password with the hashed password in the database
    const isMatched = await bcrypt.compare(password, user.password)

    // If passwords don't match, return a 401 Unauthorized response
    if (!isMatched) {
      return res.status(401).json({
        msg: "Incorrect Password",
      })
    }
    //     only send userName and user id to next route
    user = {
      userName: user.userName,
      _id: user._id
    }

    req.user = user
    return next()




  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "internal server error"
    })
  }



}






// users have access to website but can't buy or review product

// buyers can do all things that users can do and
//can buy and review product but can't sell,

// sellers can do all things that buyers can do and
//can sell products but can't administrate website


// admins are admins of website that's it
