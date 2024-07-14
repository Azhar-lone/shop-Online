// Importing dependencies

// Importing models
import reviewModel from "../../../model/reviewsModel.js";

export default async function getAverageRating(req, res) {
  try {
    const id = req.query.id;

    const result = await reviewModel.aggregate([
      { $match: { reviewOf: id } },
      { $group: { _id: null, averageRating: { $avg: "$rating" } } },
      { $project: { _id: 0, averageRating: 1 } }, // Project only the average rating
    ]);
    if (result.length > 0) {
      return res.status(200).json({ averageRating: result[0] });
    }
    return res.status(404).json({ msg: "reviews not found" });
  } catch (err) {
    console.error("getAverageRating: ", err);
    return res.status(500).json({ msg: "internal server error" });
  }
}
