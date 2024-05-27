import userModel from "../../../model/userModel.js";
import multer from "multer";
import path from "path"


const ValidFile = [

]



const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let user = await userModel.findById(req.currentUserId)
      .select("userName -_id")

    if (file.mimetype !== ValidFile) {
      cb("invalid file type")
    }
    // pipe ext  
    file.ext = ValidFile[file.mimetype]
    cb(null, path.resolve("Files/", user.userName, "/"))

  },
  filename: (req, file, cb) => {
    let extention = file.ext
    cb(null, `profile.${extention}`)
  }
})


export const uploadProfile_multer = multer({
  storage: storage, limits: {
    fileSize: (1024 * 1024) * 20, //20 mb
    fields: 0, //non-file feilds
    files: 1, //files
    parts: 1//file+non-file feilds
  },
})




export default async function uploadProfile(req, res) {
  try {
    let user = await userModel.findByIdAndUpate(req.currentUserId, { profilePath: req.file.path })
      .select("profilePath -_id")

    res.status(200).json({
      msg: 'image uploaded successfully',
      newProfile: user.profilePath
    })
  } catch (error) {
    res.status(500).json({
      msg: 'internal server error',
      error: error.message
    })
  }
}
