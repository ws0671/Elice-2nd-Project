import { Schema } from "mongoose";

const ArticleSchema = new Schema(
  {
    articleId: {
      type: Number,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      // 영어
      type: String,
      required: true,
    },
    categoryName: {
      // 한글
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    like: {
      type: Number,
      default: 0,
    },
    hits: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export { ArticleSchema };
