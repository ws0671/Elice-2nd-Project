import { Router } from "express";
import { GameGraphService } from "../services/gameGraphService";

const GameGraphRouter = Router();

GameGraphRouter.get("/worstGame", async (req, res, next) => {
  try {
    const gameGraphList = await GameGraphService.getWorstRank();
    res.status(200).send(gameGraphList);
  } catch (error) {
    next(error);
  }
});

GameGraphRouter.get("/bestGame", async (req, res, next) => {
  try {
    const gameGraphList = await GameGraphService.getBestRank();
    res.status(200).send(gameGraphList);
  } catch (error) {
    next(error);
  }
});

GameGraphRouter.get("/recentRelease", async (req, res, next) => {
  try {
    const gameGraphList = await GameGraphService.getRecentRelease();
    res.status(200).send(gameGraphList);
  } catch (error) {
    next(error);
  }
});

GameGraphRouter.get("/bestGenre/:genre", async (req, res, next) => {
  try {
    const gameGenre = req.params.genre;
    const gameGraphList = await GameGraphService.getBestRankByGenre({
      gameGenre,
    });
    res.status(200).send(gameGraphList);
  } catch (error) {
    next(error);
  }
});

GameGraphRouter.get("/bestAge/:age", async (req, res, next) => {
  try {
    const gameAge = req.params.age;
    const gameGraphList = await GameGraphService.getBestRankByAge({
      gameAge,
    });
    res.status(200).send(gameGraphList);
  } catch (error) {
    next(error);
  }
});

GameGraphRouter.get("/releaseByYear", async (req, res, next) => {
  try {
    const gamesByYear = await GameGraphService.getGamesByReleaseYear();
    res.status(200).send(gamesByYear);
  } catch (error) {
    next(error);
  }
});

GameGraphRouter.get("/gamesByGenre", async (req, res, next) => {
  try {
    const gamesByGenre = await GameGraphService.getGamesByGenre();
    res.status(200).send(gamesByGenre);
  } catch (error) {
    next(error);
  }
});

GameGraphRouter.get("/indieByYear", async (req, res, next) => {
  try {
    const indieByYear = await GameGraphService.getIndieByYear();
    res.status(200).send(indieByYear);
  } catch (error) {
    next(error);
  }
});
export { GameGraphRouter };
