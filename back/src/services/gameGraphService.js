import { name as worstName, negativeRate } from "../json/똥겜TOP10";
import { name as bestName, positiveRate } from "../json/평점TOP10";
import { name as recentName, releaseDate } from "../json/최신TOP5";

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
};

export { gameGraphService };
