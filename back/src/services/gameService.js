import { Game, Review, User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

const GameService = {
  getGameInfo: async ({ userId, gameId }) => {
    const game = await Game.findById({ gameId });
    if (!game) {
      throw new Error("해당 게임이 없습니다. 다시 한 번 확인해 주세요.");
    }

    if (userId === undefined) {
      const reviews = await Review.findAllByGame({ gameId });
      const gameInfo = { game, reviews };
      return gameInfo;
    } else {
      const bookmarkOrNot = await User.findBookmark({ userId, gameId });
      const reviews = await Review.findAllByGame({ gameId });
      const gameInfo = { game, bookmarkOrNot, reviews };
      return gameInfo;
    }
  },

  getGames: async ({ page, numOfPageSkip, numOfPageLimit }) => {
    const games = await Game.findAll({ page, numOfPageSkip, numOfPageLimit });
    const gameCounts = await Game.countGames({});
    return { games, gameCounts };
  },

  getRankedList: async ({ colName, numOfLimit }) => {
    const games = await Game.sortByColumn({ colName, numOfLimit });
    const gameCounts = await Game.countGames({});
    return { games, gameCounts };
  },

  getSearchResult: async ({
    key,
    colName,
    page,
    sortOrder,
    numOfPageLimit,
  }) => {
    const filter = {
      name: { $regex: `^${key}`, $options: "i" },
    };
    const games = await Game.searchSortByColumn({
      filter,
      colName,
      page,
      sortOrder,
      numOfPageLimit,
    });
    const gameCounts = await Game.countGames(filter);
    return { games, gameCounts };
  },

  getAgeList: async ({ age, page, numOfPageLimit }) => {
    const games = await Game.findByAge({ age, page, numOfPageLimit });
    return { games };
  },

  getGenreList: async ({ gameGenre, page, numOfPageLimit }) => {
    const games = await Game.findByGenre({ gameGenre, page, numOfPageLimit });
    console.log(games);
    return { games };
  },

  getPlatformList: async ({ platform, page, numOfPageLimit }) => {
    const games = await Game.findByPlatform({ platform, page, numOfPageLimit });
    return { games };
  },
};

export { GameService };
