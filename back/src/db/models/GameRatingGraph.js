import { GameRatingGraphModel } from "../schemas/gameGraph";

const GameRatingGraph = {
  create: async ({ newGame }) => {
    const createdNewGame = await GameRatingGraphModel.create(newGame);
    return createdNewGame;
  },

  findBestRating: async () => {
    const game = await GameRatingGraphModel.find({
      positiveRate: { $gt: 75 },
    }).sort({
      positiveRate: -1,
      overallReview: -1,
    });
    return game;
  },

  findWorstRating: async () => {
    const game = await GameRatingGraphModel.find({
      positiveRate: { $lt: 75 },
    }).sort({
      negativeRate: -1,
      overallReview: -1,
    });
    return game;
  },
};

export { GameRatingGraph };
