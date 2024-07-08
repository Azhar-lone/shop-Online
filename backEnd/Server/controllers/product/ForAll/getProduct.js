//importing dependencies

// Importing Models
import productModel from "../../../model/productModel.js";

export default async function getProduct(req, res) {
  try {
    const id = req.params.id;
    // request full product
    const full = req.query.full;

    const product = await productModel
      .findById(id)
      .select(
        full === "full"
          ? " name discription owner category price images inStock likedBy"
          : " discription owner -_id"
      )
      .populate({
        path: "owner",
        select: "firstName lastName profilePic userName -_id",
      });

    if (product) {
      return res.status(200).json({
        product: product,
      });
    }
    return res.status(404).json({
      msg: "product not Found",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "internal server error",
      error: err, //developmentOnly
    });
  }
}
