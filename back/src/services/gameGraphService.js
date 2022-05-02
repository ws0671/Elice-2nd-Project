import { name as worstName, negativeRate } from "../json/worstGameTOP10";
import { name as bestName, positiveRate } from "../json/bestGameTOP10";
import { name as recentName, releaseDate } from "../json/recentGameTOP5";
import { gameByReleaseYear, gameByGenre, indieByYear } from "../json/chartData";
import { GameGraph } from "../db";

const gameGraphService = {
  getWorstRank: async () => {
    const name = Object.values(worstName);
    if (!name) {
      throw new Error("해당 데이터가 없습니다. 다시 한 번 확인해 주세요.");
    }
    const rating = Object.values(negativeRate);
    const zip = name.map((e, i) => [e, rating[i]]);
    zip.sort((a, b) => b[1] - a[1]);
    let [x, y] = [[], []];
    zip.map((e) => {
      x.push(e[0]);
      y.push(e[1]);
    });

    return [x, y];
  },

  getBestRank: async () => {
    const name = Object.values(bestName);
    if (!name) {
      throw new Error("해당 데이터가 없습니다. 다시 한 번 확인해 주세요.");
    }
    const rating = Object.values(positiveRate);
    const zip = name.map((e, i) => [e, rating[i]]);
    zip.sort((a, b) => b[1] - a[1]);
    let [x, y] = [[], []];
    zip.map((e) => {
      x.push(e[0]);
      y.push(e[1]);
    });

    return [x, y];
  },

  getRecentRelease: async () => {
    const name = Object.values(recentName);
    if (!name) {
      throw new Error("해당 데이터가 없습니다. 다시 한 번 확인해 주세요.");
    }
    const date = Object.values(releaseDate);
    const zip = name.map((e, i) => [e, date[i]]);
    zip.sort((a, b) => b[1] - a[1]);
    let [x, y] = [[], []];
    zip.map((e) => {
      x.push(e[0]);
      y.push(e[1]);
    });

    return [x, y];
  },

  getBestRankByGenre: async ({ gameGenre }) => {
    const games = await GameGraph.findByGenre({ gameGenre });
    const x = games.map((el) => el.name);
    const y = games.map((el) => el.positiveRate);

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
