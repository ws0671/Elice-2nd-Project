import { Schema, model } from "mongoose";

const LikeSchema = new Schema(
  {
    likeId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    articleId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LikeModel = model("Like", LikeSchema);

export { LikeModel };
