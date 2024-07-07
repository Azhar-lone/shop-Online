import { createToken } from '../../../middlewares/auth.js';
import bcrypt from 'bcrypt';
import userModel from '../../../model/userModel.js';
import generalModel from '../../../model/generalModel.js';

/**
 * Suggests a related username if the original one is taken.
 * @param {string} originalUsername - The original username.
 * @returns {Promise<string>} - A unique related username.
 */
async function suggestRelatedUsername(originalUsername) {
  while (true) {
    // Generate a random number to append to the original username
    let number = Math.ceil(Math.random() * 100);
    const relatedUsername = `${originalUsername}-${number}`;
    
    // Check if the generated username already exists in the database
    const existingUser = await userModel.findOne({ userName: relatedUsername }).select('_id');

    // If the username does not exist, return it
    if (!existingUser) {
      return relatedUsername; 
    }
  }
}

/**
 * Handles the sign-up process.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export default async function signUp(req, res) {
  try {
    // Destructure the required fields from the request body
    const { email, firstName, lastName, phoneNumber, password, country, userName } = req.body;

    // Check if the provided country exists in the database
    const validCountry = await generalModel.exists({ countries: country });

    // If the country is not valid, return an error response
    if (!validCountry) {
      console.log(country);
      return res.status(401).json({
        msg: "Invalid request: Country not recognized"
      });
    }

    // Check if the email or username is already taken
    const existingUser = await userModel.findOne({ "$or": [{ email }, { userName }] }).select("userName email -_id");
    
    // If either the email or username is taken, handle the response accordingly
    if (existingUser) {
      if (existingUser.userName === userName) {
        // If the username is taken, suggest a related username
        const suggestedUserName = await suggestRelatedUsername(userName);
        return res.status(403).json({
          msg: 'Username already taken',
          suggestedUserName,
        });
      }
      return res.status(403).json({
        msg: 'Email already registered',
      });
    }

    // Hash the password with a salt factor of 5
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create a new user instance with the provided and hashed details
    const user = new userModel({
      email,
      phoneNumber,
      password: hashedPassword,
      userName,
      country,
      lastName,
      firstName
    });

    // Save the new user to the database
    const savedUser = await user.save();

    // If saving the user fails, return an error response
    if (!savedUser) {
      return res.status(500).json({
        msg: 'Error creating user',
      });
    }

    // Create a JWT token for the newly created user
    const token = createToken(savedUser._id.toString());

    // Send the token as a cookie in the response
    return res.cookie('login', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    }).status(200).json({
      userName: savedUser.userName,
    });
  } catch (error) {
    // Log the error and return a generic error response
    console.error(error);
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
}
