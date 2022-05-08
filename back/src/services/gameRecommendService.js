import { GameRecommend } from "../db";

const GameRecommendService = {
  getRecommendGames: async ({ data }) => {
    console.log(data);
    console.log(data[0]);
    const genres = data[0].genre;
    const tags = data[0].answer;
    const recommendData = await GameRecommend.findByGenreAndTag({
      genres,
      tags,
    });
    if (!recommendData) {
      throw new Error("응답 기록이 없습니다. 다시 한 번 확인해 주세요.");
    }
    return recommendData;
  },
};

export { GameRecommendService };
