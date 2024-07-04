
import blogModel from "../../../model/blogModel.js"


export default async function createBlog(req, res) {
    try {

        const { slug, blog } = req.body

        let blogSaved = await blogModel.create({
            slug, blog
        })

        if (blog) {
            return res.status(201).json({
                blog: blogSaved, owner: req.currentUserId
            })
        }

        return res.status(401).json({
            msg: "blog not created"
        })

    } catch (error) {
        res.status(500).json({
            msg: "Internal server erorr"
        })
    }

}