import { Router } from "express";
import { gameService } from "../services/gameService";

const gameRouter = Router();

gameRouter.get("/list/:page", async function (req, res, next) {
  try {
    const page = req.params.page;
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

gameRouter.get("/:gameId", async function (req, res, next) {
  try {
    const gameId = req.params.gameId;
    const gameInfo = await gameService.getGameInfo({
      gameId,
    });

    res.status(200).send(gameInfo);
  } catch (error) {
    next(error);
  }
});

gameRouter.get("/rankedList/:colName", async function (req, res, next) {
  try {
    const colName = req.params.colName;
    const rankedList = await gameService.getRankedList({
      colName,
      numOfLimit,
    });

    if (rankedList.errorMessage) {
      throw new Error(rankedList.errorMessage);
    }

    res.status(200).send(rankedList);
  } catch (error) {
    next(error);
  }
});
export { gameRouter };
