import { LikeModel } from "../schemas/like";

const Like = {
  create: async ({ newLike }) => {
    await LikeModel.create(newLike);
  },

  findAllByArticle: async ({ articleId }) => {
    const likes = await LikeModel.find({ articleId });
    return likes;
  },

  findByFilter: async (filter) => {
    const like = await LikeModel.findOne(filter);
    return like;
  },

  delete: async (filter) => {
    await LikeModel.deleteOne(filter);
  },
};
export { Like };
