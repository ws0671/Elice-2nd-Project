import { LikeModel } from "../schemas/like";

const Like = {
  create: async ({ newLike }) => {
    await LikeModel.create(newLike);
  },

  delete: async ({ userId, articleId }) => {
    await LikeModel.deleteOne({ userId, articleId });
  },
};
export { Like };
