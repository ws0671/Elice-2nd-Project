import { GameRatingGraph } from "../db";
import recentGame from "../json/recentGameTOP10";
import { gameByReleaseYear, gameByGenre, indieByYear } from "../json/chartData";
import { GameGenreGraph } from "../db";
import { GameAgeGraph } from "../db";

const GameGraphService = {
  getWorstRank: async () => {
    const games = Object.values(worstGame);

    if (!games) {
      throw new Error("해당 데이터가 없습니다. 다시 한 번 확인해 주세요.");
    }
    return games;
  },

  getWorstRank: async () => {
    const games = GameRatingGraph.findWorstRating();
    if (!games) {
      throw new Error("해당 데이터가 없습니다. 다시 한 번 확인해 주세요.");
    }
    return games;
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
    const games = await GameGenreGraph.findByGenre({ gameGenre });
    if (!games) {
      throw new Error("해당 장르가 없습니다. 다시 한 번 확인해 주세요");
    }
    return games;
  },

  getBestRankByAge: async ({ gameAge }) => {
    const games = await GameAgeGraph.findByAge({ gameAge });
    if (!games) {
      throw new Error("해당 장르가 없습니다. 다시 한 번 확인해 주세요");
    }
    return games;
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

export { GameGraphService };
