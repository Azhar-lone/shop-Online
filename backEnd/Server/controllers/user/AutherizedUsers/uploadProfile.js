import fs from "fs";
import userModel from "../../../model/userModel.js";
import multer from "multer";
import { resolve } from "path"


const ValidFile = {
  "image/png": "png",
  "image/jpeg": "jpeg",
}



const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      // verify file is of valid type
      // if file.memetype is present it will return 
      // defined else undefined 
      if (!ValidFile[file.mimetype]) {
        return cb("invalid file type")
      }

      // get userName from db and upload file 
      // one users directory which should be created
      // while user was created
      let user = await userModel.findById(req.currentUserId)
        .select("userName -_id")
      // Delete previous profile picture before uploading this
      // with fs.rm

      let fullPath = resolve("Files/", user.userName, "/profile")
      if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
          if (err) {
            cb(err.message); // Pass error message to callback
          }
        });
      }


      // upload file to users folder
      cb(null, resolve("Files/", user.userName, "/"))

    } catch (error) {
      cb(error.message)
    }

  },
  filename: (req, file, cb) => {
    try {

      //get extension of file from memeType
      // and save it as profile.ext 
      file.path
      console.log("prodfile." + file.path)
      cb(null, `profile.${ValidFile[file.mimetype]}`)

    } catch (error) {
      cb(error.message)

    }

  }
})


export const uploadProfile_multer = multer({
  storage: storage, limits: {
    fileSize: (1024 * 1024) * 20, //20 mb
    fields: 0, //non-file feilds
    files: 1, //files
    parts: 2//file+non-file feilds+req.currentUser
  },
})




export default async function uploadProfile(req, res) {
  try {
    let user = await userModel.findByIdAndUpdate(req.currentUserId, { profilePath: req.file.path })
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
