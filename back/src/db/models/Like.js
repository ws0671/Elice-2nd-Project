import { LikeModel } from "../schemas/like";

const Like = {
  create: async ({ newLike }) => {
    const createdNewLike = await LikeModel.create(newLike);
    return createdNewLike;
  },
};
export { Like };
