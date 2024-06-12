
import { createToken } from '../../../middlewares/auth.js'
import userModel from '../../../model/userModel.js'

// STEP 2
// TODO: Cancel account deletion process scheduled on login
// and set suspended state to false

/**
 * Handles the login process.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export default async function login(req, res) {
  try {

    const { email } = req.body

    // if matched bring user object from dataBase
    // until user is not found cause it is present
    let user = undefined
    while (1) {
      user = await userModel.findOne({ email })
      if (user) {
        break;
      }

    }



    // let { user } = req.user
    // If login is successful, create and send an authentication token
    const token = createToken(user._id.toString())

    // Return a 200 OK response with a success message and the user's name and Id
    return (
      res.cookie('login', token, {
        httpOnly: true,
        secure: true,
        sameOrigin: 'none'
      }).status(200).json({
        msg: 'Login successful',
        user: user
      }))


  } catch (error) {
    // Log the error for debugging purposes
    console.error('Login Error:', error)

    // Return a 500 Internal Server Error response with an error message
    return res.status(500).json({
      msg: 'Internal server error occurred during login',
    })
  }
}



