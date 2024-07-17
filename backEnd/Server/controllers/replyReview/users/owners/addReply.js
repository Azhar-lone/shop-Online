import reviewModel, { replyModel } from "../../../../model/reviewsModel.js";
import productModel from "../../../../model/productModel.js";

export default async function addReply(req, res) {
  try {
    const { reply } = req.body;
    // Review Id
    const { id } = req.params;

    const reviewFound = await reviewModel.findById(id).select("reviewOf -_id");

    if (!reviewFound) {
      return res.status(401).json({
        msg: "failed to reply to review (review not found)",
      });
    }
    // get product and check if it is current users product
    // only owners of product can reply to review
    const productFound = await productModel
      .findById(reviewFound.reviewOf)
      .select("owner -_id");
    if (!productFound || productFound.owner !== req.currentUserId) {
      return res.status(401).json({
        msg: "invalid request probably you are not autherized",
      });
    }
    const replied = await replyModel.create({
      reply,
      replyOf: id,
    });
    if (!replied) {
      return res.status(404).json({
        msg: "failed to reply probably internal server error",
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
