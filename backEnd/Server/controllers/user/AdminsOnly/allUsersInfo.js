import userModel from "../../../model/userModel.js";

export default async function allUsersInfo(req, res) {
  try {
    // Get limit and pageNumber from query parameters and provide default values
    const limit = req.query.limit || 20;
    const pageNumber = req.query.page || 1;

    // Fetch users with pagination
    let users = await userModel
      .find()
      .limit(limit)
      .skip((pageNumber - 1) * limit);

    // Check if users were found
    if (!users.length) {
      return res.status(404).json({
        msg: "No users found",
      });
    }

    // Send response with user data
    res.status(200).json({
      users: users,
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
}
