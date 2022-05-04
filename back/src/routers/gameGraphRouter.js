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

gameGraphRouter.get("/bestAge/:age", async (req, res, next) => {
  try {
    const gameAge = req.params.age;
    const gameGraphList = await gameGraphService.getBestRankByAge({
      gameAge,
    });
    res.status(200).send(gameGraphList);
  } catch (error) {
    next(error);
  }
});

gameGraphRouter.get("/releaseByYear", async (req, res, next) => {
  try {
    const gamesByYear = await gameGraphService.getGamesByReleaseYear();
    res.status(200).send(gamesByYear);
  } catch (error) {
    next(error);
  }
});

gameGraphRouter.get("/gamesByGenre", async (req, res, next) => {
  try {
    const gamesByGenre = await gameGraphService.getGamesByGenre();
    res.status(200).send(gamesByGenre);
  } catch (error) {
    next(error);
  }
});

gameGraphRouter.get("/indieByYear", async (req, res, next) => {
  try {
    const indieByYear = await gameGraphService.getIndieByYear();
    res.status(200).send(indieByYear);
  } catch (error) {
    next(error);
  }
});
export { gameGraphRouter };
