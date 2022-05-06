import { GameModel } from "../schemas/game";

const Game = {
  create: async ({ newGame }) => {
    const createdNewGame = await GameModel.create(newGame);
    return createdNewGame;
  },

  findAll: async ({ page, numOfPageSkip = 10, numOfPageLimit = 10 }) => {
    const games = await GameModel.find({})
      .skip((page - 1) * numOfPageSkip)
      .limit(numOfPageLimit);
    return games;
  },

  countGames: async (filter) => {
    const gameCounts = await GameModel.countDocuments(filter);
    return gameCounts;
  },

  findById: async ({ gameId }) => {
    const game = await GameModel.findOne({ gameId });
    return game;
  },

  findAllBookmarks: async ({
    bookmarkList,
    page,
    numOfPageSkip = 4,
    numOfPageLimit = 4,
  }) => {
    const bookmarkCount = bookmarkList.length;
    const bookmarkGames = await GameModel.find({
      gameId: { $in: bookmarkList },
    })
      .skip((page - 1) * numOfPageSkip)
      .limit(numOfPageLimit);
    return { bookmarkCount, bookmarkGames };
  },

  findSortedBookmarks: async ({
    bookmarkList,
    criteria,
    page,
    numOfPageSkip = 4,
    numOfPageLimit = 4,
  }) => {
    const bookmarkCount = bookmarkList.length;
    const bookmarkGames = await GameModel.find({
      gameId: { $in: bookmarkList },
    })
      .sort({ [criteria]: -1 })
      .skip((page - 1) * numOfPageSkip)
      .limit(numOfPageLimit);
    return { bookmarkCount, bookmarkGames };
  },

  sortByColumn: async ({ colName, numOfLimit = 10 }) => {
    const games = await GameModel.find({})
      .sort({ [colName]: -1 })
      .limit(numOfLimit);
    return games;
  },

  findByGenre: async ({ gameGenre, page, numOfPageLimit = 10 }) => {
    const games = await GameModel.find({
      genres: { $regex: `^${gameGenre}`, $options: "i" },
    })
      .skip((page - 1) * numOfPageLimit)
      .limit(numOfPageLimit)
      .sort({ overallReview: -1, positiveRate: -1 });
    return games;
  },

  findByPlatform: async ({ platform, page, numOfPageLimit = 10 }) => {
    const games = await GameModel.find({
      platforms: { $regex: `^${platform}`, $options: "i" },
    })
      .skip((page - 1) * numOfPageLimit)
      .limit(numOfPageLimit)
      .sort({ overallReview: -1, positiveRate: -1 });
    return games;
  },

  findByAge: async ({ age, page, numOfPageLimit = 10 }) => {
    if (age == 0) {
      age = "전체";
    }
    const games = await GameModel.find({
      requiredAge: { $regex: `^${age}`, $options: "i" },
    })
      .skip((page - 1) * numOfPageLimit)
      .limit(numOfPageLimit)
      .sort({ overallReview: -1, positiveRate: -1 });
    return games;
  },

  searchSortByColumn: async ({
    filter,
    colName,
    sortOrder,
    page,
    numOfPageLimit = 10,
  }) => {
    const games = await GameModel.find(filter)
      .sort({ [colName]: [sortOrder] })
      .skip((page - 1) * numOfPageLimit)
      .limit(numOfPageLimit);
    return games;
  },
};

export { Game };
