import reviewModel from "../../../../model/reviewsModel.js";
/**
 * Deletes a Review by its ID.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
export default async function deleteReview(req, res) {
  try {
    const id = req.params.id;

    // Ensure req.currentUserId is defined and validate ownership
    if (!req.currentUserId) {
      return res.status(401).json({
        msg: "Unauthorized: Missing user authentication",
      });
    }

    // Find the review by ID and check ownership while deleting
    const review = await reviewModel.findById(id).select("reviewBy");

    if (!review) {
      return res.status(404).json({
        msg: "review not found",
      });
    }

    if (req.currentUserId !== review.reviewBy.toString()) {
      return res.status(401).json({
        msg: "Not authorized to perform operation",
      });
    }

    // Delete the review
    const deletedreview = await review.delete();

    if (!deletedreview) {
      return res.status(404).json({
        msg: "review not found",
      });
    }

    return res.status(200).end();
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}
