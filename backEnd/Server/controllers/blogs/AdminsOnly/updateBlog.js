
import blogModel from "../../../model/blogModel.js"


export default async function updateBlog(req, res) {
    try {


        let updatedblog = await blogModel.findOneAndUpdate({ slug: req.params.slug }, {

        }, { new: true })

        if (blog) {
            return res.status(200).json({
                updatedblog: updatedblog
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