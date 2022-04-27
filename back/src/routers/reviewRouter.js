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

ReviewRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.currentUserId;
    const { content } = req.body.content;

    const updateData = { content };

    const updatedReview = await ReviewService.updateReview({
      reviewId,
      userId,
      updateData,
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
});

ReviewRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.currentUserId;

    await ReviewService.deleteReview({ reviewId, userId });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export { ReviewRouter };
