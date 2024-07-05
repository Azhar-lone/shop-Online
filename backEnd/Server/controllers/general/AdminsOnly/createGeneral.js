import generalModel from "../../../model/generalModel.js";

export default async function createGeneral(req, res) {
  try {
    const data = await generalModel.create({});
    if (data) {
      return res.status(200).json({
        msg: "info created successfully",
      });
    }

    return res.status(404).json({
      msg: "error while creating info",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "internal server error",
    });
  }
}
