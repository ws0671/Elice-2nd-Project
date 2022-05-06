import { GameRecommendModel } from "../schemas/gameRecommend";

const GameRecommend = {
  create: async ({ newGame }) => {
    const createdNewGame = await GameRecommendModel.create(newGame);
    return createdNewGame;
  },

  findByGenreAndTag: async ({ genres, tags }) => {
    let ntag = [];
    const a = { 0: "a1", 1: "a2", 2: "a3" };
    const b = { 0: "b1", 1: "b2", 2: "b3", 3: "b4", 4: "b5" };
    const c = { 0: "c1", 1: "c2", 2: "c3", 3: "c4", 4: "c5" };
    const d = { 0: "d1", 1: "d2", 2: "d3", 3: "d4", 4: "d5" };
    const e = { 0: "e1", 1: "e2", 2: "e3", 3: "e4" };
    const f = { 0: "f1", 1: "f2", 2: "f3" };
    const g = { 0: "g1", 1: "g2", 2: "g3" };
    const h = { 0: "h1", 1: "h2", 2: "h3" };
    const i = { 0: "i1", 1: "i2", 2: "i3" };
    const j = { 0: "j1", 1: "j2", 2: "j3", 3: "j4" };
    const k = { 0: "k1", 1: "k2", 2: "k3", 3: "k4" };
    const l = { 0: "l1", 1: "l2", 2: "l3", 3: "l4" };
    const choices = [a, b, c, d, e, f, g, h, i, j, k, l];
    for (let i = 0; i < choices.length; i++) {
      ntag.push(choices[i][tags[i]]);
    }
    const game = await GameRecommendModel.aggregate([
      {
        $match: { genres: { $in: [...genres] }, tag: { $in: [...ntag] } },
      },
      { $sample: { size: 5 } },
    ]).sort({
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
