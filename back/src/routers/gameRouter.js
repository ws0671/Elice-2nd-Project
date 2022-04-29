import { Router } from "express";
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
    res.status(200).json(gameList);
  } catch (error) {
    next(error);
  }
});

gameRouter.get("/:gameId", async (req, res, next) => {
  try {
    const gameId = Number(req.params.gameId);
    const gameInfo = await gameService.getGameInfo({
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

    if (rankedList.errorMessage) {
      throw new Error(rankedList.errorMessage);
    }

    res.status(200).json(rankedList);
  } catch (error) {
    next(error);
  }
});

gameRouter.get("/search/:key/:page", async (req, res, next) => {
  try {
    const key = req.params.key;
    const page = req.params.page;
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
