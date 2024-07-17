import reviewModel from "../../../model/reviewsModel.js";

export default async function likeReview(req, res) {
  try {
    const reviewId = req.params.id;

    const review = await reviewModel.findById(reviewId).select("likes");

    if (!review) {
      return res.status(404).json({
        msg: "Review Not Found",
      });
    }

    const isLiked = review.likes.some((like) => like.equals(currentUserId));

    // if liked then dislike and vice versa
    const Updated = isLiked
      ? { $pull: { likes: currentUserId } }
      : { $addToSet: { likes: currentUserId } };

    await reviewModel
      .findByIdAndUpdate(reviewId, Updated, { new: true })
      //   change this to return just length of likes not full likes array
      .select("likes -_id");

    return res.status(200).json({
      msg: isLiked ? "Unliked successfully" : "liked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
}
