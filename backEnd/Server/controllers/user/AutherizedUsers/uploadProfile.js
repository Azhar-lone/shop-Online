import userModel from "../../../model/userModel.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => { },
  filename: (req, file, cb) => { }
})


export const uploadProfile_multer = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,//10Mb
    fields: 0,
    files: 1,
    parts: 1
  },
})


export default async function uploadProfile(req, res) {
  try {

    user.profilePicPath = req.file.path
    let savedUser = await user.save()
    res.status(200).json({
      msg: 'image uploaded successfully',
      user: savedUser
    })
  } catch (error) {
    res.status(500).json({
      msg: 'internal server error',
      error: error.message
    })
  }
}
