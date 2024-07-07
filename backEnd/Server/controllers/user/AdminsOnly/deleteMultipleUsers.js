import userModel from "../../../model/userModel.js";

export default async function deleteMultipleUsers(req, res) {
  try {
    // Destructure arrayOfUsersId from the request body
    let { arrayOfUsersId } = req.body;

    // Validate the input to ensure it is an array and not empty
    if (!Array.isArray(arrayOfUsersId) || arrayOfUsersId.length === 0) {
      return res.status(400).json({
        msg: "Invalid input: arrayOfUsersId should be a non-empty array",
      });
    }

    // Arrays to keep track of deleted and invalid user IDs
    let deletedUsers = [];
    let invalidUserIds = [];

    // Use Promise.all to delete users in parallel
    await Promise.all(
      arrayOfUsersId.map(async (userId) => {
        // Check if userId is a valid MongoDB ObjectId
        if (!userModel.isValidObjectId(userId)) {
          invalidUserIds.push(userId);
        } else {
          // Delete user by ID and add to deletedUsers if successful
          const deletedUser = await userModel.findByIdAndDelete(userId);
          if (deletedUser) {
            deletedUsers.push(userId);
          }
        }
      })
    );

    // Send a success response with details about deleted and invalid user IDs
    res.status(200).json({
      msg: "Deletion process completed",
      deletedUsers,
      invalidUserIds,
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
}
