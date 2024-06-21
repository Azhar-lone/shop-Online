
import blogModel from "../../../model/blogModel.js"


export default async function getBlog(req, res) {
    try {


        let blog = await blogModel.findOne({ slug: req.params.slug })
        if (blog) {
            return res.status(200).json({
                blog: blog
            })
        }

        return res.status(401).json({
            msg: "blog not found"
        })

    } catch (error) {
        res.status(500).json({
            msg: "Internal server erorr"
        })
    }

}