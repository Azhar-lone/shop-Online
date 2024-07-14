//importing dependencies

// Importing Models
import productModel from "../../../model/productModel.js";
import userModel from "../../../model/userModel.js";

export default async function addProduct(req, res) {
  try {
    const { name, discription, category, price, inStock, images } = req.body;

    let product = await productModel.create({
      name,
      discription,
      category,
      price,
      inStock,
      images,
      owner: req.currentUserId,
    });
    let user = await userModel
      .findByIdAndUpdate(req.currentUserId,{products})
      .select("_id");

    if (product && user) {
      return res.status(200).json({
        product: product,
      });
    } else {
      return res.status(404).json({
        msg: "failed to create product",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "internal server error",
    });
  }
}
