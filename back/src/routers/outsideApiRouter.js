import { Router } from "express";
import { OutsideApi } from "../common/OutsideApi";

const OutsideApiRouter = Router();

OutsideApiRouter.get("/gameNews", async (req, res, next) => {
  try {
    const category = req.body.category;
    const gameNews = await OutsideApi.getNews(category);
    res.status(200).json(gameNews);
  } catch (error) {
    next(error);
  }
});

OutsideApiRouter.get("/youtubeVideos", async (req, res, next) => {
  try {
    console.log("router ok");
    const youtubeVideos = await OutsideApi.getSeachedVideos();
    console.log("completed");
    res.status(200).json(youtubeVideos);
  } catch (error) {
    next(error);
  }
});

export { OutsideApiRouter };
