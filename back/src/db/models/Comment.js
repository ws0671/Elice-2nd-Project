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

  update: async ({ commentId, updateObject }) => {
    const filter = { commentId }
    const update = { $set: updateObject }
    const option = { returnOriginal: false }
    const updateComment = await CommentModel.findOneAndUpdate(
      filter,
      update,
      option
    )

    return updateComment
  },

  softDelete: async ({ commentId, updateObject }) => {
    const filter = { id: commentId }
    const update = { $set: updateObject }
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
