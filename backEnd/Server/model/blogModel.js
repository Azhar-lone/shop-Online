import mongoose from "mongoose";

// min can be minLength
const schema = mongoose.Schema(
  {
    slug: {
      type: String,
      unique: [true, "slug must be unique"],
      required: [true, "slug is required"],
      min: [5, "slug must be atleast 5 charactors long"],
      max: [80, "slug must be maximax 80 charactors long"],
    },
    blog: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: [true, "owner is required"],
      ref: "userModel",
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blogModel", schema);
export default blogModel;
