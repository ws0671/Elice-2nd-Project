import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { GameService } from "../services/GameService";

const GameRouter = Router();

GameRouter.get("/list/:page", async (req, res, next) => {
  try {
    const page = Number(req.params.page);
    const numOfPageSkip = req.query.page ? Number(req.query.page) : undefined;
    const numOfPageLimit = req.query.limit
      ? Number(req.query.limit)
      : undefined;
    const gameList = await GameService.getGames({
      page,
      numOfPageSkip,
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
    const rankedList = await GameService.getRankedList({
      colName,
      numOfLimit,
    });

    res.status(200).send(rankedList);
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
    const gameSearchResult = await GameService.getSearchResult({
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

export { GameRouter };
