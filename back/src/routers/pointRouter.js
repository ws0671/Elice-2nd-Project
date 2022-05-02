import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { pointService } from "../services/pointService";

const PointRouter = Router();
PointRouter.use(loginRequired);

PointRouter.post("/", async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { miniGame, point } = req.body;

    const newPoint = { userId, miniGame, point };

    await pointService.addPoint({ newPoint });
    res.status(201).end();
  } catch (error) {
    next(error);
  }
});

PointRouter.get("/", async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const miniGame = req.query.miniGame;

    const point = await pointService.checkPoint({
      userId,
      miniGame,
      year,
      month,
      day,
    });
    res.status(200).json(point);
  } catch (error) {
    next(error);
  }
});

export { PointRouter };
