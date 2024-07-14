// import fs from "fs";
import userModel from "../../../model/userModel.js";
import cloudinary from "../../../middlewares/Cloudinary.js";

import multer from "multer";
// import { resolve } from "path"

const ValidFile = {
  "image/png": "png",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({ destination: "/tmp" });

export const uploadProfile_multer = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20, //20 mb
    fields: 0, //non-file feilds
    files: 1, //files
    parts: 2, //file+non-file feilds+req.currentUser
  },
  fileFilter: (req, file, cb) => {
    try {
      if (!ValidFile[file.mimetype]) {
        cb("invalid file type");
      }
      file.cb(null);
    } catch (error) {
      console.log(error);
    }
  },
});

export default async function uploadProfile(req, res) {
  try {
    const { imageUrl } = req.file.path;

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

// export function generateURL(req, res) {
//   try {
//     const timestamp = Math.round(new Date().getTime() / 1000);
//     const signature = cloudinary.utils.api_sign_request(
//       {
//         timestamp,
//         upload_preset: process.env.Profile_Upload_preset, // Ensure you have created this preset in Cloudinary
//       },
//       cloudinary.config().api_secret
//     );

//     res.json({
//       cloud_name: cloudinary.config().cloud_name,
//       api_key: cloudinary.config().api_key,
//       timestamp,
//       signature,
//       upload_preset: "YOUR_UPLOAD_PRESET",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "internal server error",
//     });
//   }
// }
