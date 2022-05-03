import worstGame from "../json/worstGameTOP10";
import bestGame from "../json/bestGameTOP10";
import recentGame from "../json/recentGameTOP10";
import { gameByReleaseYear, gameByGenre, indieByYear } from "../json/chartData";
import { GameGraph } from "../db";

const gameGraphService = {
  getWorstRank: async () => {
    const games = Object.values(worstGame);
    if (!games) {
      throw new Error("해당 데이터가 없습니다. 다시 한 번 확인해 주세요.");
    }
    const gameData = [
      games[0],
      games[1],
      games[5],
      games[8],
      games[17],
      games[18],
      games[20],
      games[21],
    ];

    return gameData;
  },

  getBestRank: async () => {
    const games = Object.values(bestGame);
    if (!games) {
      throw new Error("해당 데이터가 없습니다. 다시 한 번 확인해 주세요.");
    }
    const gameData = [
      games[0],
      games[1],
      games[5],
      games[8],
      games[17],
      games[18],
      games[20],
      games[21],
    ];

    return gameData;
  },

  getRecentRelease: async () => {
    const games = Object.values(recentGame);
    if (!games) {
      throw new Error("해당 데이터가 없습니다. 다시 한 번 확인해 주세요.");
    }
    const gameData = [
      games[0],
      games[1],
      games[5],
      games[8],
      games[17],
      games[18],
      games[20],
      games[21],
    ];

    return gameData;
  },

  getBestRankByGenre: async ({ gameGenre }) => {
    const games = await GameGraph.findByGenre({ gameGenre });
    const x = games.map((el) => el.name);
    const y = games.map((el) => el.positiveRate);
    console.log(games);
    if (!games) {
      throw new Error("해당 장르가 없습니다. 다시 한 번 확인해 주세요");
    }
    return [x, y];
  },

  getGamesByReleaseYear: async () => {
    const games = Object.values(gameByReleaseYear);
    games.sort((a, b) => a.name - b.name);
    return games;
  },

  getGamesByGenre: async () => {
    const games = Object.values(gameByGenre);
    games.sort((a, b) => b.value - a.value);
    return games;
  },

  getIndieByYear: async () => {
    const games = Object.values(indieByYear);
    games.sort((a, b) => a.name - b.name);
    return games;
  },
};

export { gameGraphService };
