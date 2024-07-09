import productModel from "../../../model/productModel.js";

export default async function searchProducts(req, res) {
  try {
    let { query } = req.query;

    let products = await productModel.find();
    if (!products) {
      return res.status(404).json({
        msg: "no products found",
      });
    }
    return res.status(200).json({
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
}
