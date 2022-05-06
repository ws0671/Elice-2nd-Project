import { GameRecommendModel } from "../schemas/gameRecommend";

const GameRecommend = {
  create: async ({ newGame }) => {
    const createdNewGame = await GameRecommendModel.create(newGame);
    return createdNewGame;
  },

  findByGenreAndTag: async ({ gameGenre, tag }) => {
    const game = await GameRecommendModel.find({
      genres: { $regex: `^${gameGenre}`, $options: "i" },
    }).sort({
      positiveRate: -1,
      overallReview: -1,
    });
    return game;
  },

  findByTag: async ({ tag }) => {
    const game = await GameRecommendModel.find({
      tag,
    }).sort({
      positiveRate: -1,
      overallReview: -1,
    });
    return game;
  },

  //
};

export { GameRecommend };
