//importing dependencies

// Models
import reviewModel from "../../../../model/reviewsModel.js";

export default async function updateReview(req, res) {
  try {
    const id = req.params.id;
    const { rating, review } = req.body;
    const found = await reviewModel.findById(id).select("reviewBy -_id");

    if (!found || !found.reviewBy !== req.currentUserId) {
      return res.status(401).json({
        msg: "you are not autherized to perform this action (not owner)",
      });
    }

    let savedReview = await reviewModel.findByIdAndUpdate(
      id,
      {
        rating,
        review,
      },
      { new: true }
    );

    if (savedReview) {
      return res.status(200).json({
        review: savedReview,
      });
    } else {
      return res.status(404).json({
        msg: "failed to update review",
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: "internal server error",
    });
  }
}
