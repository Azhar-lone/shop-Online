import userModel from "../../../model/userModel.js";

export default async function follow(req, res) {
  try {
    const recipientId = req.params.id;
    const currentUserId = req.currentUserId;

    if (recipientId === currentUserId) {
      return res.status(401).json({
        msg: "Invalid request",
      });
    }

    const [recipient, sender] = await Promise.all([
      userModel.findById(recipientId).select("followers"),
      userModel.findById(currentUserId).select("following"),
    ]);

    if (!recipient || !sender) {
      return res.status(404).json({
        msg: "Sender or recipient not found",
      });
    }

    const isFollowing = recipient.followers.some((follower) =>
      follower.equals(currentUserId)
    );

    const recipientUpdate = isFollowing
      ? { $pull: { followers: currentUserId } }
      : { $addToSet: { followers: currentUserId } };
    const senderUpdate = isFollowing
      ? { $pull: { following: recipientId } }
      : { $addToSet: { following: recipientId } };

    await Promise.all([
      userModel
        .findByIdAndUpdate(recipientId, recipientUpdate, { new: true })
        .select("followers -_id"),
      userModel
        .findByIdAndUpdate(currentUserId, senderUpdate, { new: true })
        .select("following -_id"),
    ]);

    return res.status(200).json({
      msg: isFollowing ? "Unfollowed successfully" : "Followed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
}
