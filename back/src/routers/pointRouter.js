import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { pointService } from "../services/pointService";

const PointRouter = Router();
PointRouter.use(loginRequired);

PointRouter.get("/:miniGame", async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const miniGame = req.params.miniGame;
    const { year, month, day } = req.body;

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
