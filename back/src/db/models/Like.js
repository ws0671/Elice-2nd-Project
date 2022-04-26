import { LikeModel } from "../schemas/like";

const Like = {
  create: async ({ newLike }) => {
    const createdNewLike = await LikeModel.create(newLike);
    return createdNewLike;
  },
  delete: async ({ userId, articleId }) => {
    await LikeModel.deleteOne({ userId, articleId });
  },
};
export { Like };
