//importing dependencies

// Models
import { replyModel } from "../../../../model/reviewsModel.js";

export default async function updateReply(req, res) {
  try {
    const id = req.params.id;
    const { reply } = req.body;
    const found = await replyModel.findById(id).select("replyBy -_id");

    if (!found || !found.replyBy !== req.currentUserId) {
      return res.status(401).json({
        msg: "you are not autherized to perform this action (not owner)",
      });
    }

    let savedReply = await replyModel.findByIdAndUpdate(
      id,
      {
        reply,
      },
      { new: true }
    );

    if (savedReply) {
      return res.status(200).json({
        review: savedReply,
      });
    } else {
      return res.status(404).json({
        msg: "failed to update reply",
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: "internal server error",
    });
  }
}
