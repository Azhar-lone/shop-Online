//importing dependencies

// Importing models
import productModel from "../../../model/productModel.js";

export default async function getAllProduct(req, res) {
  try {
    const limit = req.query.limit || 20;
    const pageNumber = req.query.page || 1;

    const products = await productModel
      .find()
      .select("-updatedAt")
      .sort({ createdAt: -1, updatedAt: -1 })
      .skip((pageNumber - 1) * limit)
      .limit(limit);

    if (products) {
      return res.status(200).json({
        products: products,
      });
    }
    return res.status(404).json({
      msg: "products not Found",
    });
  } catch (err) {
    console.log("getAllProducts : ", err);
    return res.status(500).json({
      msg: "internal server error",
    });
  }
}
