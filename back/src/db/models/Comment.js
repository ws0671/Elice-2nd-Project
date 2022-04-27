import { CommentModel } from "../schemas/comment";

const Comment = {
  create: async ({ newComment }) => {
    const createNewComment = await CommentModel.create(newComment);
    return createNewComment;
  },

  findById: async ({ commentId }) => {
    const comment = await CommentModel.findOne({ commentId });
    return comment;
<<<<<<< HEAD
  },

  findAllByArticle: async ({ articleId }) => {
    const comments = await CommentModel.find({ articleId });
    return comments;
=======
>>>>>>> 4993eb3522db3c7d0a477539f424ebc7753a15ab
  },

  update: async ({ commentId, toUpdate }) => {
    const filter = { commentId };
    const update = toUpdate;
    const option = { returnOriginal: false };
    const updateComment = await CommentModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updateComment;
  },
};

export { Comment };
