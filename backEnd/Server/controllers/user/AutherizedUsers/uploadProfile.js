// import fs from "fs";
import userModel from "../../../model/userModel.js";
// import multer from "multer";
// import { resolve } from "path"

// const ValidFile = {
//   "image/png": "png",
//   "image/jpeg": "jpeg",
// }

// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     try {
//       // verify file is of valid type
//       // if file.memetype is present it will return
//       // defined else undefined
//       if (!ValidFile[file.mimetype]) {
//         return cb("invalid file type")
//       }

//       // get userName from db and upload file
//       // one users directory which should be created
//       // while user was created
//       let user = await userModel.findById(req.currentUserId)
//         .select("userName -_id")
//       // Delete previous profile picture before uploading this
//       // with fs.rm

//       let fullPath = resolve("Files/", user.userName, "/profile")
//       if (fs.existsSync(fullPath)) {
//         fs.unlink(fullPath, (err) => {
//           if (err) {
//             cb(err.message); // Pass error message to callback
//           }
//         });
//       }

//       // upload file to users folder
//       cb(null, resolve("Files/", user.userName, "/"))

//     } catch (error) {
//       cb(error.message)
//     }

//   },
//   filename: (req, file, cb) => {
//     try {

//       //get extension of file from memeType
//       // and save it as profile.ext
//       file.path
//       console.log("prodfile." + file.path)
//       cb(null, `profile.${ValidFile[file.mimetype]}`)

//     } catch (error) {
//       cb(error.message)

//     }

//   }
// })

// export const uploadProfile_multer = multer({
//   storage: storage, limits: {
//     fileSize: (1024 * 1024) * 20, //20 mb
//     fields: 0, //non-file feilds
//     files: 1, //files
//     parts: 2//file+non-file feilds+req.currentUser
//   },
// })

export default async function uploadProfile(req, res) {
  try {
    const { imageUrl } = req.body;

    let user = await userModel
      .findById(req.currentUserId)
      .select("profilePath ");

    // Delete the previous profile image from Cloudinary
    if (user) {
      await cloudinary.uploader.destroy(user.profilePath);
    }
    // change dataBase
    user.profilePath = imageUrl;
    // Save
    let savedUser = undefined;

    // if failed to save try again
    while (!savedUser) {
      let savedUser = await user.save();
    }

    return res.status(500).end();
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error: error.message,
    });
  }
}

export function generateURL(req, res) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        upload_preset: process.env.Profile_Upload_preset, // Ensure you have created this preset in Cloudinary
      },
      cloudinary.config().api_secret
    );

    res.json({
      cloud_name: cloudinary.config().cloud_name,
      api_key: cloudinary.config().api_key,
      timestamp,
      signature,
      upload_preset: "YOUR_UPLOAD_PRESET",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
}
