import { Schema, model } from "mongoose"

const CommentSchema = new Schema(
  {
    commentId: {
      type: String,
      required: true,
    },
    articleId: {
      type: String,
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
)

const CommentModel = model("Comment", CommentSchema)

export { CommentModel }
