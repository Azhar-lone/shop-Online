import { mkdir } from 'fs'
import { createToken } from '../../../middlewares/auth.js'
import bcrypt from 'bcrypt'
import { resolve } from "path"

import userModel from '../../../model/userModel.js'
import generalModel from '../../../model/generalModel.js'
/**
 * Handles the login process.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */


// Function to suggest a related username if the original one is taken

async function suggestRelatedUsername(originalUsername) {


  while (true) {
    let number = Math.ceil(Math.random() * 100)
    const relatedUsername = `${originalUsername}-${number}`
    const existingUser = await userModel.findOne({ userName: relatedUsername })

    if (!existingUser) {
      return relatedUsername // Return the suggested username when it's unique
    }
  }
}




//STEP1
export default async function signUp(req, res) {
  try {

    const { email, firstName, lastName, phoneNumber, password, country, userName } = req.body


    // check if country feild exist on db 
    // if yes it is validCountry else not valid
    let countries = await generalModel.find().select("countries -_id")
    let validCountry = countries[0].countries.find((value) => {
      if (country === value) {
        return true
      }
    })
    if (!validCountry) {
      return res.status(401).json({
        msg: "invalid requesd"
      })
    }


    const taken = await userModel.findOne({ "$or": [{ email }, { userName }] }).select("userName -_id")
    if (taken) {
      if (userName === taken.userName) {
        const suggestedUserName = await suggestRelatedUsername(userName)
        return res.status(403).json({
          msg: 'userName already taken',
          suggestedUserName: suggestedUserName,
        })
      }
      return res.status(403).json({
        msg: 'email already registered',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 5)
    let user = await new userModel({
      email,
      phoneNumber,
      password: hashedPassword.toString(),
      userName,
      country,
      lastName,
      firstName

    })

    if (!user) {
      return res.status(404).json({
        msg: 'error creating user',
      })
    }
    const savedUser = await user.save()

    mkdir(resolve("Files/", userName), { recursive: true }, err => {
      if (err) console.log('error while creating folder')
      else console.log('Folder created successfully')
    })

    const token = createToken(user._id.toString())
    return (
      res.cookie('login', token, {
        httpOnly: true,
        secure: true,
        sameOrigin: 'none'
      }).status(200).json({
        user: savedUser.userName,
      }))
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Internal server error',

    })
  }
}
