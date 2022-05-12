import { redisClient, DEFAULT_EXPIRATION } from "../db";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { GameService } from "../services/gameService";

const GameRouter = Router();

GameRouter.get("/list/:page", async (req, res, next) => {
  try {
    const page = Number(req.params.page);
    const numOfPageSkip = req.query.page ? Number(req.query.page) : undefined;
    const numOfPageLimit = req.query.limit
      ? Number(req.query.limit)
      : undefined;

    // redis 서버에서 캐시 확인
    const cache = await redisClient.GET(
      `game/list/?${page}&${numOfPageSkip}&${numOfPageLimit}`
    );
    if (cache) {
      // 캐시가 있으면
      res.status(200).json(JSON.parse(cache));
    } else {
      // 캐시가 없으면
      const gameList = await GameService.getGames({
        page,
        numOfPageSkip,
        numOfPageLimit,
      });

      await redisClient.SETEX(
        `game/list/?${page}&${numOfPageSkip}&${numOfPageLimit}`,
        DEFAULT_EXPIRATION,
        JSON.stringify(gameList)
      );
      res.status(200).json(gameList);
    }
  } catch (error) {
    next(error);
  }
});
GameRouter.get("/genre/:page", async (req, res, next) => {
  try {
    const page = Number(req.params.page);
    const gameGenre = req.query.genre;
    const numOfPageLimit = req.query.limit
      ? Number(req.query.limit)
      : undefined;
    const gameList = await GameService.getGenreList({
      gameGenre,
      page,
      numOfPageLimit,
    });
    res.status(200).json(gameList);
  } catch (error) {
    next(error);
  }
});
GameRouter.get("/age/:page", async (req, res, next) => {
  try {
    const page = Number(req.params.page);
    const age = req.query.age;
    const numOfPageLimit = req.query.limit
      ? Number(req.query.limit)
      : undefined;
    const gameList = await GameService.getAgeList({
      age,
      page,
      numOfPageLimit,
    });
    res.status(200).json(gameList);
  } catch (error) {
    next(error);
  }
});
GameRouter.get("/platform/:page", async (req, res, next) => {
  try {
    const page = Number(req.params.page);
    const platform = req.query.platform;
    const numOfPageLimit = req.query.limit
      ? Number(req.query.limit)
      : undefined;
    const gameList = await GameService.getPlatformList({
      platform,
      page,
      numOfPageLimit,
    });
    res.status(200).json(gameList);
  } catch (error) {
    next(error);
  }
});
// 로그인 안 한 사용자, 북마크 정보 없음
GameRouter.get("/:gameId/guest", async (req, res, next) => {
  try {
    const userId = undefined;
    const gameId = Number(req.params.gameId);
    const gameInfo = await GameService.getGameInfo({
      userId,
      gameId,
    });

    res.status(200).send(gameInfo);
  } catch (error) {
    next(error);
  }
});
// 로그인 한 사용자, 북마크 정보 있음
GameRouter.get("/:gameId", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const gameId = Number(req.params.gameId);
    const gameInfo = await GameService.getGameInfo({
      userId,
      gameId,
    });

    res.status(200).json(gameInfo);
  } catch (error) {
    next(error);
  }
});

GameRouter.get("/rankedList/:colName", async (req, res, next) => {
  try {
    const colName = req.params.colName;
    const numOfLimit = req.query.limit ? Number(req.query.limit) : undefined;

    // redis 서버에서 캐시 확인
    const cache = await redisClient.GET(`rankedList/?${colName}&${numOfLimit}`);
    if (cache) {
      // 캐시가 있으면
      res.status(200).json(JSON.parse(cache));
    } else {
      // 캐시가 없으면
      const rankedList = await GameService.getRankedList({
        colName,
        numOfLimit,
      });

      await redisClient.SETEX(
        `rankedList/?${colName}&${numOfLimit}`,
        DEFAULT_EXPIRATION,
        JSON.stringify(rankedList)
      );
      res.status(200).json(rankedList);
    }
  } catch (error) {
    next(error);
  }
});

GameRouter.get("/search/:key", async (req, res, next) => {
  try {
    const key = req.params.key;
    const page = Number(req.query.page);
    const colName = req.query.colName ? req.query.colName : undefined;
    const numOfPageLimit = req.query.limit
      ? Number(req.query.limit)
      : undefined;
    const sortOrder = req.query.sortOrder ? Number(req.query.sortOrder) : 1;

    // redis 서버에서 캐시 확인
    const cache = await redisClient.GET(
      `search/${key}?${page}&${colName}&${numOfPageLimit}&${sortOrder}`
    );
    if (cache) {
      // 캐시가 있으면
      res.status(200).json(JSON.parse(cache));
    } else {
      // 캐시가 없으면
      const gameSearchResult = await GameService.getSearchResult({
        key,
        colName,
        sortOrder,
        page,
        numOfPageLimit,
      });

      await redisClient.SETEX(
        `search/${key}?${page}&${colName}&${numOfPageLimit}&${sortOrder}`,
        DEFAULT_EXPIRATION,
        JSON.stringify(gameSearchResult)
      );
      res.status(200).json(gameSearchResult);
    }
  } catch (error) {
    next(error);
  }
});

export { GameRouter };
