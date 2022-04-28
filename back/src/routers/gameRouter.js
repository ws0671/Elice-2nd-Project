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
    const gameList = await gameService.getGames({
      page,
      numOfPageSkip,
      numOfPageLimit,
    });
    res.status(200).send(gameList);
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

    res.status(200).send(gameInfo);
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

export { gameRouter };
