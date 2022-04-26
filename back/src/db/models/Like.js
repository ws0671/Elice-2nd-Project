import { LikeModel } from "../schemas/like";

const Like = {
  create: async ({ newLike }) => {
    await LikeModel.create(newLike);
  },

  delete: async (filter) => {
    await LikeModel.deleteOne(filter);
  },
};
export { Like };
