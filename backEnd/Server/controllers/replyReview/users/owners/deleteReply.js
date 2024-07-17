import { replyModel } from "../../../../model/reviewsModel.js";

/**
 * Deletes a reply by its ID.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
export default async function deletereply(req, res) {
  try {
    const id = req.params.id;

    // Ensure req.currentUserId is defined and validate ownership
    if (!req.currentUserId) {
      return res.status(401).json({
        msg: "Unauthorized: Missing user authentication",
      });
    }

    // Find the reply by ID and check ownership while deleting
    const reply = await replyModel.findById(id).select("replyBy");

    if (!reply) {
      return res.status(404).json({
        msg: "reply not found",
      });
    }

    if (req.currentUserId !== reply.replyBy.toString()) {
      return res.status(401).json({
        msg: "Not authorized to perform operation",
      });
    }

    // Delete the reply
    const deletedreply = await reply.delete();

    if (!deletedreply) {
      return res.status(404).json({
        msg: "reply not deleted",
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
