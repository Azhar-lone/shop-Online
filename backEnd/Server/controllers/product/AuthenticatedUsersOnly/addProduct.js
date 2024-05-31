//importing dependencies
import multer from "multer";
import fs from "fs"
import path from "path";
// Importing Models
import productModel from "../../../model/productModel.js"
import userModel from "../../../model/userModel.js";

const allowedMimeTypes = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    // Add more mappings for other allowed MIME types as needed
};




const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {


            if (!allowedMimeTypes[file.mimetype]) {
                return cb('Invalid file type. Only PNG, JPEG, or JPG images allowed')
            }
            let product = new productModel({})

            let user = await userModel.findById(req.currentUserId)
                .select("userName -_id")

            //create a folder for current product using its id
            // it will be effecient to delete or update these
            // files later
            // do it sync so it will stop further code execution
            // cause next step depends on this operation

            let userFolder = path.resolve("Files/", user.userName, "/")
            fs.mkdirSync(userFolder + product._id, { recursive: true })
            req.product = product
            cb(null, userFolder + product._id)
        } catch (error) {
            cb(error.message)

        }


    },
    filename: (req, file, cb) => {
        try {
            cb(null, `${Date.now()}.${allowedMimeTypes[file.mimetype]}`)


        } catch (error) {
            cb(error.message)
        }
    }
})


export const uploadProduct_multer = multer({
    storage: storage, limits: {
        fileSize: (1024 * 1024) * 20, //20 mb
        fields: 5, //non-file feilds
        files: 5, //files
        parts: 10//file+non-file feilds
    },
})






export default async function addProduct(req, res) {
    try {


        product = await req.product.save()

        if (product) {
            return res.status(200).json({
                msg: "product created successfully",
                product: product
            })
        }
        else {
            return res.status(404).json({
                msg: "failed to create product"
            })
        }



    } catch (err) {
        return res.status(500).json({
            msg: "internal server error",
            error: err//developmentOnly
        })
    }
}
