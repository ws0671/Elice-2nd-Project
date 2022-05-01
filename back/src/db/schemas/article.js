import { Schema } from "mongoose";

const ArticleSchema = new Schema(
  {
    articleId: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    category: {
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
