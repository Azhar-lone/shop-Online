//importing dependencies
// import multer from "multer";
// import { resolve } from "path"
// Importing Models
import productModel from "../../../model/productModel.js"
// import userModel from "../../../model/userModel.js";



// const allowedMimeTypes = {
//     "image/png": "png",
//     "image/jpeg": "jpeg",
//     // Add more mappings for other allowed MIME types as needed
// };



// const storage = multer.diskStorage({
//     destination: async (req, file, cb) => {
//         try {
//             let user = await userModel.findById(req.currentUserId).select("userName -_id")
//             let product = new productModel({})
//             cb(null, resolve("Files/", user.userName, product._id))//files/username/id
//         } catch (error) {
//             cb(error.message)
//         }
//     }

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


        const {
            name,
            discription,
            category,
            price,
            inStock,
            images
        } = req.body

        const product = await productModel.create({
            name,
            discription,
            category,
            price,
            inStock,
            images,
            owner: req.currentUserId,
        })

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
