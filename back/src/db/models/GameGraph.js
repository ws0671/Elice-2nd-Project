import { GameGraphModel } from "../schemas/gameGraph";

const GameGraph = {
  create: async ({ newGame }) => {
    const createdNewGame = await GameGraphModel.create(newGame);
    return createdNewGame;
  },

  findByGenre: async ({ gameGenre }) => {
    const game = await GameGraphModel.find({
      genres: { $regex: `^${gameGenre}`, $options: "i" },
    }).sort({
      positiveRate: -1,
      overallReview: -1,
    });
    return game;
  },
};

export { GameGraph };
