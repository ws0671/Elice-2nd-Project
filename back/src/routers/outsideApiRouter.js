import { Router } from "express";
import { OutsideApi } from "../common/OutsideApi";

const OutsideApiRouter = Router();

OutsideApiRouter.get("/gameNews", async (req, res, next) => {
  try {
    const category = req.query.category;
    const gameNews = await OutsideApi.getNews(category);
    res.status(200).json(gameNews);
  } catch (error) {
    next(error);
  }
});

OutsideApiRouter.get("/youtubeVideos", async (req, res, next) => {
  try {
    const youtubeVideos = await OutsideApi.getYoutubeDatas();
    const searchedVideos = await OutsideApi.getSearchedVideos(youtubeVideos);
    res.status(200).json(searchedVideos);
  } catch (error) {
    next(error);
  }
});

export { OutsideApiRouter };
