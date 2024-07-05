import blogModel from "../../../model/blogModel.js";

export default async function createBlog(req, res) {
  try {
    const { slug, blog } = req.body;

    let alReady = await blogModel.findOne({ slug });
    if (alReady) {
      return res.status(401).json({
        msg: "slug already in use try another one",
      });
    }

    let blogSaved = await blogModel.create({
      slug,
      blog,
      owner: req.currentUserId,
    });

    if (blog) {
      return res.status(201).json({
        blog: blogSaved,
      });
    }

    return res.status(401).json({
      msg: "blog not created",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Internal server erorr",
    });
  }
}
