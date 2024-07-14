import reviewModel from "../../../../model/reviewsModel.js";

// STEP 2
// TODO: Cancel account deletion process scheduled on login
// and set suspended state to false

/**
 * Handles the login process.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export default async function addReview(req, res) {
  try {
    const { review, rating } = req.body;
    // productId
    const { id } = req.params;
    let Review = await reviewModel.create({
      review,
      rating,
      reviewOf: id,
      reviewBy: req.currentUserId,
    });

    if (!Review) {
      return res.status(401).json({
        msg: "failed to add review",
      });
    }
    return res.status(200).end();
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Add Review Error:", error);

    // Return a 500 Internal Server Error response with an error message
    return res.status(500).json({
      msg: "Internal server error occurred while adding review",
    });
  }
}

export async function isAllowedToAddReview(req, res, next) {
  try {
    const user = await userModel
      .findById(req.currentUserId)
      .select("role -_id");
    if (
      (user && user.role === "seller") ||
      user.role === "admin" ||
      user.role === "buyer"
    ) {
      return next();
    } else
      return res.status(401).json({
        msg: "only sellers or buyers can perform this operation",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server errors",
    });
  }
}
