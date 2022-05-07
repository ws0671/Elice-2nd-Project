import { GameRecommendCache } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

const GameRecommendCacheService = {
  addRecommendData: async ({ userId, genre, answer }) => {
    const recommendData = { userId, genre, answer };
    // db에 저장
    const createdData = await GameRecommendCache.createData({ recommendData });
    return createdData;
  },

  getRecommendData: async ({ userId }) => {
    const recommendData = await GameRecommendCache.findByUserId({ userId });
    if (!recommendData) {
      throw new Error("응답 기록이 없습니다. 다시 한 번 확인해 주세요.");
    }
    return recommendData;
  },

  deleteRecommendData: async ({ userId }) => {
    const isDataDeleted = await GameRecommendCache.deleteByUserId({ userId });
    if (!isDataDeleted) {
      throw new Error(
        "해당하는 회원 정보가 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    return { status: "ok" };
  },
};

export { GameRecommendCacheService };
