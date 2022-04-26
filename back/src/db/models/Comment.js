import { CommentModel } from "../schemas/comment"

const Comment = {
  create: async ({ newComment }) => {
    const createNewComment = await CommentModel.create(newComment)
    return createNewComment
  },

  findById: async ({ commentId }) => {
    const comment = await CommentModel.findOne({ commentId })
    return comment
  },

  update: async ({ commentId, toUpdate }) => {
    const filter = { commentId }
    const update = toUpdate
    const option = { returnOriginal: false }
    const updateComment = await CommentModel.findOneAndUpdate(
      filter,
      update,
      option
    )

    return updateComment
  },
}

export { Comment }
