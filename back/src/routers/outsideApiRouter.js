import { redisClient, DEFAULT_EXPIRATION } from "../db";
import { Router } from "express";
import { OutsideApi } from "../common/OutsideApi";

const OutsideApiRouter = Router();

OutsideApiRouter.get("/gameNews", async (req, res, next) => {
  try {
    const category = req.body.category;

    // redis 서버에서 캐시 확인
    const cache = await redisClient.GET(`gameNews`);
    if (cache) {
      // 캐시가 있으면
      res.status(200).json(JSON.parse(cache));
    } else {
      // 캐시가 없으면
      const gameNews = await OutsideApi.getNews(category);

      await redisClient.SETEX(
        `gameNews`,
        DEFAULT_EXPIRATION,
        JSON.stringify(gameNews)
      );
      res.status(200).json(gameNews);
    }
  } catch (error) {
    next(error);
  }
});

OutsideApiRouter.get("/youtubeVideos", async (req, res, next) => {
  try {
    const keyword = req.body.keyword;

    // redis 서버에서 캐시 확인
    const cache = await redisClient.GET(`youtubeVideos`);
    if (cache) {
      // 캐시가 있으면
      res.status(200).json(JSON.parse(cache));
    } else {
      const youtubeDatas = await OutsideApi.getYoutubeDatas(keyword);
      const searchedVideos = await OutsideApi.getSearchedVideos(youtubeDatas);

      await redisClient.SETEX(
        `youtubeVideos`,
        86400, // 유튜브 캐시는 하루동안 저장
        JSON.stringify(searchedVideos)
      );
      res.status(200).json(searchedVideos);
    }
  } catch (error) {
    next(error);
  }
});

export { OutsideApiRouter };
