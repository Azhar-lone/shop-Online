//Not A Valid Route


// //importing dependencies

// import userModel from "../../Models/userModel.js"

// // import userModel from "../../Models/userModel"


// // import Models
// // import userModel from "../../Models/userModel.js"
// /*
// *@params req=httpRequest
// */

// export default function deleteMultiple(req, res) {
//     try {

//         const { userIds } = req.body

//         //both limit and page number should be positive
//         userIds.forEach(async (userId) => {
//             await userModel.findByIdAndUpdate(userId,{

//             })
//         });
//         return res.status(200).json({
//             msg: "deletion successfull"
//         })

//     } catch (err) {
//         return res.status(500).json({
//             msg: "internal server error",
//             error: err//developmentOnly
//         })
//     }
// }