import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    reviewOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productModel",
      required: true,
    },
    reviewBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
      },
    ],
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("reviewModel", schema);
export default reviewModel;

const ReplySchema = mongoose.Schema(
  {
    replyOf: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "reviewModel",
    },

    reply: {
      type: String,
      required: true,
    },
    replyBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
  },
  { timestamps: true }
);

export const replyModel = mongoose.model("replyModel", ReplySchema);
