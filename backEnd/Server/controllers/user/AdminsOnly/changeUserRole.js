import userModel from "../../../model/userModel.js";

export default async function changeUserRole(req, res) {
  try {
    const { id, role } = req.body;
    const user = await userModel
      .findByIdAndUpdate(id, { role: role }, { new: true })
      .select("_id");
    if (!user) {
      return res.status(403).json({
        msg: "failed to change users role",
      });
    }
    return res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
}
