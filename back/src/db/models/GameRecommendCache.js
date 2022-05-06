import { GameRecommendCacheModel } from "../schemas/gameRecommendCache";

const GameRecommendCache = {
  createData: async ({ recommendData }) => {
    const { userId, genre, answer } = recommendData;
    const createdNewData = await GameRecommendCacheModel.create({
      userId,
      genre,
      answer,
    });
    return createdNewData;
  },

  findByUserId: async ({ userId }) => {
    const recommendData = await GameRecommendCacheModel.find({
      userId,
    });
    return recommendData;
  },

  deleteByUserId: async ({ userId }) => {
    const data = await GameRecommendCacheModel.deleteOne({ userId });
    const isDataDeleted = data.deletedCount === 1;
    return isDataDeleted;
  },
};

export { GameRecommendCache };
