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
    return { gameCount, games };
  },

  countGames: async ({}) => {
    const gameCounts = await GameModel.countDocuments({});
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
    const gameCount = await GameModel.countDocuments({});
    const games = await GameModel.find({})
      .sort({ [colName]: -1 })
      .limit(numOfLimit);
    return { gameCount, games };
  },

  searchSortByColumn: async ({
    filter,
    colName,
    sortOrder,
    page,
    numOfPageLimit = 10,
  }) => {
    const gameCount = await GameModel.countDocuments(filter);
    const games = await GameModel.find(filter)
      .sort({ [colName]: [sortOrder] })
      .skip((page - 1) * numOfPageLimit)
      .limit(numOfPageLimit);
    return { gameCount, games };
  },
};

export { Game };
