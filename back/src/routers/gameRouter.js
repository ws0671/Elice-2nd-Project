import { Router } from "express";
import { gameService } from "../services/gameService";

const gameRouter = Router();

gameRouter.get("/list/:page", async function (req, res, next) {
  try {
<<<<<<< HEAD
    const page = req.params.page;
    const gamelist = await gameService.getGames({ page });

    res.status(200).send(gamelist);
=======
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
>>>>>>> b257dc06fcf631bd92edb569b3aaf28f627ae4e6
  } catch (error) {
    next(error);
  }
});

gameRouter.get("/:gameId", async function (req, res, next) {
  try {
<<<<<<< HEAD
    const gameId = req.params.gameId;
=======
    const gameId = Number(req.params.gameId);
>>>>>>> b257dc06fcf631bd92edb569b3aaf28f627ae4e6
    const gameInfo = await gameService.getGameInfo({
      gameId,
    });

    res.status(200).send(gameInfo);
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
gameRouter.get("/topTen/:col", async function (req, res, next) {
  try {
    const col = req.params.col;
    const topTen = await gameAuthService.getTopTen({
      col,
    });

    if (topTen.errorMessage) {
      throw new Error(topTen.errorMessage);
    }

    res.status(200).send(topTen);
=======
gameRouter.get("/rankedList/:colName", async function (req, res, next) {
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

    res.status(200).send(rankedList);
>>>>>>> b257dc06fcf631bd92edb569b3aaf28f627ae4e6
  } catch (error) {
    next(error);
  }
});
export { gameRouter };
