import { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    commentId: {
      type: Number,
      required: true,
    },
    articleId: {
      type: Number,
      required: true,
    },
    writerId: {
      type: String,
      required: true,
    },
    writerNickname: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: false,
      maxlength: 1000,
    },
    isDeleted: {
      // soft delete
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export { CommentSchema };
