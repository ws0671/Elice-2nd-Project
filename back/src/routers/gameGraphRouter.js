import { Router } from "express";
import { gameGraphService } from "../services/gameGraphService";

const gameGraphRouter = Router();

gameGraphRouter.get("/worstGame", async (req, res, next) => {
  try {
    const gameGraphList = await gameGraphService.getWorstRank();
    res.status(200).send(gameGraphList);
  } catch (error) {
    next(error);
  }
});

gameGraphRouter.get("/bestGame", async (req, res, next) => {
  try {
    const gameGraphList = await gameGraphService.getBestRank();
    res.status(200).send(gameGraphList);
  } catch (error) {
    next(error);
  }
});

gameGraphRouter.get("/recentRelease", async (req, res, next) => {
  try {
    const gameGraphList = await gameGraphService.getRecentRelease();
    res.status(200).send(gameGraphList);
  } catch (error) {
    next(error);
  }
});

gameGraphRouter.get("/bestGenre/:genre", async (req, res, next) => {
  try {
    const gameGenre = req.params.genre;
    const gameGraphList = await gameGraphService.getBestRankByGenre({
      gameGenre,
    });
    res.status(200).send(gameGraphList);
  } catch (error) {
    next(error);
  }
});
export { gameGraphRouter };
