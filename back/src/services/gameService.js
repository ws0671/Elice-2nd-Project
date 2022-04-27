import { Game, Review } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

const gameService = {
  getGameInfo: async ({ gameId }) => {
    const game = await Game.findById({ gameId });
    if (!game) {
      throw new Error("해당 게임이 없습니다. 다시 한 번 확인해 주세요.");
    }

    const reviews = await Review.findAllByGame({ gameId });
    const gameInfo = { game, reviews };
    return gameInfo;
  },

  getGames: async ({ page, numOfPageSkip, numOfPageLimit }) => {
    const games = await Game.findAll({ page, numOfPageSkip, numOfPageLimit });
    return games;
  },

  getRankedList: async ({ colName, numOfLimit }) => {
    const games = await Game.sortByColumn({ colName, numOfLimit });
    return games;
  },
};

export { gameService };
