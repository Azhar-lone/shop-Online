
import blogModel from "../../../model/blogModel.js"


export default async function createBlog(req, res) {
    try {


        let blog = await blogModel.create({

        })

        if (blog) {
            return res.status(201).json({
                blog: blog
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