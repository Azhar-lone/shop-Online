import blogModel from "../../../model/blogModel.js"


export default async function getAllBlogs(req, res) {
    try {

        const limit = req.query.limit || 10
        const page = req.query.page || 1

        let blogs = await blogModel.find()
            .sort({ "$or": [{ addedOn: -1 }, { updatedOn: -1 }] })
            .skip((page - 1) * limit)
            .limit(limit)

        if (blogs) {
            return res.status(200).json({
                blogs: blogs
            })
        }

        return res.status(401).json({
            msg: "blogs not found"
        })


    } catch (error) {
        res.status(500).json({
            msg: "Internal server erorr"
        })
    }

}