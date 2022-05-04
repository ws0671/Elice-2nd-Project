import { redisClient, DEFAULT_EXPIRATION } from "../db";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { gameService } from "../services/gameService";

const gameRouter = Router();

gameRouter.get("/list/:page", async (req, res, next) => {
  try {
    const page = Number(req.params.page);
    const numOfPageSkip = req.query.page ? Number(req.query.page) : undefined;
    const numOfPageLimit = req.query.limit
      ? Number(req.query.limit)
      : undefined;

    // redis 서버에서 캐시 확인
    const cache = await redisClient.get("game/list");
    console.log(cache);
    if (cache) {
      // 캐시가 있으면
      res.status(200).json(cache);
    } else {
      // 캐시가 없으면
      const gameList = await gameService.getGames({
        page,
        numOfPageSkip,
        numOfPageLimit,
      });
      // const { data } = await axios.get("http://localhost:5001/game/list", {
      //   params: { page },
      // });
      redisClient.set(
        `game/list/${[page]}`,
        DEFAULT_EXPIRATION,
        JSON.stringify(gameList)
      ); // set with an expiration time (or can use other redis expressions
      // redis can only store strings, so we need to convert the data to a string
      res.status(200).json(gameList);
    }
  } catch (error) {
    next(error);
  }
});
// 로그인 안 한 사용자, 북마크 정보 없음
gameRouter.get("/:gameId/guest", async (req, res, next) => {
  try {
    const userId = undefined;
    const gameId = Number(req.params.gameId);
    const gameInfo = await gameService.getGameInfo({
      userId,
      gameId,
    });

    res.status(200).send(gameInfo);
  } catch (error) {
    next(error);
  }
});
// 로그인 한 사용자, 북마크 정보 있음
gameRouter.get("/:gameId", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const gameId = Number(req.params.gameId);
    const gameInfo = await gameService.getGameInfo({
      userId,
      gameId,
    });

    res.status(200).json(gameInfo);
  } catch (error) {
    next(error);
  }
});

gameRouter.get("/rankedList/:colName", async (req, res, next) => {
  try {
    const colName = req.params.colName;
    const numOfLimit = req.query.limit ? Number(req.query.limit) : undefined;
    const rankedList = await gameService.getRankedList({
      colName,
      numOfLimit,
    });

    res.status(200).send(rankedList);
  } catch (error) {
    next(error);
  }
});

gameRouter.get("/search/:key", async (req, res, next) => {
  try {
    const key = req.params.key;
    const page = Number(req.query.page);
    const colName = req.query.colName ? req.query.colName : undefined;
    const numOfPageLimit = req.query.limit
      ? Number(req.query.limit)
      : undefined;
    const sortOrder = req.query.sortOrder ? Number(req.query.sortOrder) : 1;
    const gameSearchResult = await gameService.getSearchResult({
      key,
      colName,
      sortOrder,
      page,
      numOfPageLimit,
    });

    res.status(200).json(gameSearchResult);
  } catch (error) {
    next(error);
  }
});

export { gameRouter };
