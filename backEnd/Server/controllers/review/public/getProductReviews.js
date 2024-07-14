//importing dependencies

// Importing models
import reviewModel from "../../../model/reviewsModel.js";
export default async function getProductReviews(req, res) {
  try {
    const limit = req.query.limit || 5;
    const pageNumber = req.query.page || 1;
    const id = req.query.id;

    const reviews = await reviewModel
      .find({ reviewOf: id })
      .populate("reviewBy", "firstName lastName userName profilePic")
      .sort({ createdAt: -1, updatedAt: -1 })
      .skip((pageNumber - 1) * limit)
      .limit(limit);

    if (reviews) {
      return res.status(200).json({
        reviews: reviews,
      });
    }
    return res.status(404).json({
      msg: "reviews not Found",
    });
  } catch (err) {
    console.log("getProductsReviews : ", err);
    return res.status(500).json({
      msg: "internal server error",
    });
  }
}
