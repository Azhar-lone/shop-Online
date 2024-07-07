import userModel from '../../../../model/userModel.js';
import bcrypt from 'bcrypt';

/**
 * Updates user information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export default async function updateUser(req, res) {
  try {
    const { email, oldPassword, newPassword, firstName, lastName, userName } = req.body;

    // Find user by ID and select the password for verification
    const user = await userModel.findById(req.currentUserId).select('password');
    
    if (!user) {
      return res.status(401).json({
        msg: 'Failed to verify old password. Please try again.'
      });
    }

    // Verify the old password
    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isMatched) {
      return res.status(401).json({
        msg: 'Incorrect old password.'
      });
    }

    // Check if the new email or username already exists in the database
    const found = await userModel.findOne({ 
      $or: [{ email }, { userName }], 
      _id: { $ne: req.currentUserId } // Exclude current user's ID from the check
    }).select('userName email');

    if (found) {
      return res.status(401).json({
        msg: 'Username or email is already in use.'
      });
    }

    // Hash the new password if it is being updated
    const hashedPassword = newPassword ? await bcrypt.hash(newPassword, 5) : user.password;

    // Update user information
    const updatedUser = await userModel.findByIdAndUpdate(
      req.currentUserId,
      {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        userName
      },
      { new: true, select: '-password' } // Return updated document without password field
    );

    if (updatedUser) {
      return res.status(200).json({
        updatedUser
      });
    }

    return res.status(401).json({
      msg: 'Failed to update user information.'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Internal server error.'
    });
  }
}

