import { GameAgeGraphModel } from "../schemas/gameAgeGraph";

const GameAgeGraph = {
  create: async ({ newGame }) => {
    const createdNewGame = await GameAgeGraphModel.create(newGame);
    return createdNewGame;
  },

  findByAge: async ({ gameAge }) => {
    if (gameAge == 0) {
      gameAge = "전체";
    }
    const game = await GameAgeGraphModel.find({
      requiredAge: { $regex: `^${gameAge}`, $options: "i" },
    }).sort({
      positiveRate: -1,
      overallReview: -1,
    });
    return game;
  },
};

export { GameAgeGraph };
