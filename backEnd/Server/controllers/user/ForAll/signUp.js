import {mkdir} from 'fs'
import { createToken } from '../../../middlewares/auth.js'
import bcrypt from 'bcrypt'
import userModel from '../../../model/userModel.js'
import {resolve} from "path"
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

    const { email, firstName, lastName, phoneNumber, password, confirmPassword, country, userName } = req.body
    // if both are missing return this message
    if (!phoneNumber && !email) {
      return res.status(401).json({
        msg: "phone or email is required"
      })
    }


    // Check for unexpected fields
    // // if their is somthing unexpected then it is not what we need in the server
    // if (Object.keys(unexpectedFields).length > 0) {
    //   return res.status(400).json({
    //     msg: 'Unexpected fields in request body',
    //   }
    //   )
    // }



    if (password !== confirmPassword) {
      return res.status(400).json({
        msg: 'password did not match',
      })
    }


    if (email) {
      const takenEmail = await userModel.findOne({ email })
      if (takenEmail) {
        return res.status(403).json({
          msg: 'email already registered',
        })
      }
    }
    else {
      const takenPhone = await userModel.findOne({ phoneNumber })
      if (takenPhone) {
        return res.status(403).json({
          msg: 'phone already registered',
        })
      }
    }
    const takenUserName = await userModel.findOne({ userName })
    if (takenUserName) {
      const suggestedUserName = await suggestRelatedUsername(userName)
      return res.status(403).json({
        msg: 'userName already taken',
        suggestedUserName: suggestedUserName,
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
        msg: 'user Created Successfully',
        userName: savedUser,
      }))
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Internal server error',

    })
  }
}

// middleware for cleaning signUp Body
// no other feilds are allowed except which are allowed by this middleware
// export function cleanSignUp(req, res, next) {
//   try {
//     const allowedFields = ['email', 'password', 'confirmPassword', "DOB", "name"];

//     const cleanBody = {};
//     for (const key of Object.keys(req.body)) {
//       if (allowedFields.includes(key)) {
//         cleanBody[key] = req.body[key];
//       }
//     }
//     req.body = cleanBody;
//     return next();
//   } catch (error) {
//     res.status(500).json({
//       msg: 'Internal server error',
//       error: error.message,
//     })
//   }
// }