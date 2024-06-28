//importing dependencies
import multer from "multer";
import { resolve } from "path"
import { mkdirSync } from "fs"

// Importing Models
import productModel from "../../../model/productModel.js"



// const allowedMimeTypes = {
//     "image/png": "png",
//     "image/jpeg": "jpeg",
//     // Add more mappings for other allowed MIME types as needed
// };



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {

            let product = new productModel({})
            req.product = product
            mkdirSync(resolve("Files/" + product._id), { recursive: true })
            cb(null, resolve("Files/", product._id))
        } catch (error) {
            cb(error.message)
        }
    }

// })



// export const uploadProduct_multer = multer({
//     storage: storage, limits: {
//         fileSize: (1024 * 1024) * 20, //20 mb
//         fields: 5, //non-file feilds
//         files: 5, //files
//         parts: 10//file+non-file feilds
//     },
//     fileFilter: ((req, file, cb) => {
//         console.log("testing 1")
//         if (!allowedMimeTypes[file.mimetype]) {
//             return cb("invalid file type")
//         }
//         cb(null, true)
//     })
// })






export default async function addProduct(req, res) {
    try {
        const { name, discription, category, price, inStock } = req.body

        let images = []
        // push all file paths to images
        req.files.forEach(file => {
            images.push(file.path)
        });
        req.product = {
            ...req.product,
            name, discription, category, price, inStock,//All from body
            owner: req.currentUserId, //attached by middleware
            images//file urls

        }
        product = await req.product.save()

        if (product) {
            return res.status(200).json({
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
        })
    }
}
