import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { ReviewService } from "../services/reviewService";

const ReviewRouter = Router();
ReviewRouter.use(loginRequired);

ReviewRouter.post("/", async (req, res, next) => {
  try {
    const { gameId, content } = req.body;
    const userId = req.currentUserId;

    const newReview = await ArticleService.addReview({
      userId,
      gameId,
      content,
    });

    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

export { ReviewRouter };
