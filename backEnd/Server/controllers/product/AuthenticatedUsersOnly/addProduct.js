//importing dependencies
import multer from "multer";
import { resolve } from "path"
// Importing Models
import productModel from "../../../model/productModel.js"
import userModel from "../../../model/userModel.js";

const allowedMimeTypes = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    // Add more mappings for other allowed MIME types as needed
};



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            cb(null, resolve("Files"))
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
    fileFilter: ((req, file, cb) => {
        console.log("testing 1")
        if (!allowedMimeTypes[file.mimetype]) {
            return cb("invalid file type")
        }
        cb(null, true)
    })
})






export default async function addProduct(req, res) {
    try {
        console.log("\nbody", req.body)
        console.log("\nfiles", req.files)

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
