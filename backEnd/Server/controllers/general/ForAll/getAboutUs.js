// Importing dependencies

// Importing Models
import generalModel from "../../../model/generalModel.js";

export default async function getAboutus(req, res) {
  try {
    const ourTeam = await generalModel.find().select("ourTeam -_id");
    if (ourTeam) {
      return res.status(200).json({
        ourTeam: ourTeam,
      });
    }
    return res.status(404).json({
      msg: "not Found",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "internal Server Error",
    });
  }
}
