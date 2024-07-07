import productModel from "../../../../model/productModel.js";

/**
 * Deletes a product by its ID.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
export default async function deleteProduct(req, res) {
  try {
    const id = req.params.id;

    // Ensure req.currentUserId is defined and validate ownership
    if (!req.currentUserId) {
      return res.status(401).json({
        msg: "Unauthorized: Missing user authentication",
      });
    }

    // Find the product by ID and check ownership while deleting
    const product = await productModel.findById(id).select("owner");

    if (!product) {
      return res.status(404).json({
        msg: "Product not found",
      });
    }

    if (req.currentUserId !== product.owner.toString()) {
      return res.status(401).json({
        msg: "Not authorized to perform operation",
      });
    }

    // Delete the product
    const deletedProduct = await product.delete();

    if (!deletedProduct) {
      return res.status(404).json({
        msg: "Product not found",
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
