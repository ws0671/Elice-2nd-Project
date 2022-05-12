import { GameGenreGraphModel } from "../schemas/gameGenreGraph";

const GameGenreGraph = {
  create: async ({ newGame }) => {
    const createdNewGame = await GameGenreGraphModel.create(newGame);
    return createdNewGame;
  },

  findByGenre: async ({ gameGenre }) => {
    const game = await GameGenreGraphModel.find({
      genres: { $regex: `^${gameGenre}`, $options: "i" },
    }).sort({
      positiveRate: -1,
      overallReview: -1,
    });
    return game;
  },
};

export { GameGenreGraph };
