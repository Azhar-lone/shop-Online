import { replyModel } from "../../../model/reviewsModel.js";

export default async function getReply(req, res) {
  try {
    // Reply Id
    const { id } = req.params;

    const Found = await replyModel.findOne({ replyOf: id });

    if (!Found) {
      return res.status(401).json({
        msg: "no replies found",
      });
    }

    return res.status(200).json({
      reply: Found,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("get Reply Error:", error);

    // Return a 500 Internal Server Error response with an error message
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}
