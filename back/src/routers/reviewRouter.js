import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { ReviewService } from "../services/reviewService";

const ReviewRouter = Router();
ReviewRouter.use(loginRequired);

ReviewRouter.post("/", async (req, res, next) => {
  try {
    const { gameId, review } = req.body;
    const userId = req.currentUserId;

    const newReview = await ReviewService.addReview({
      userId,
      gameId,
      review,
    });

    res.status(201).json(newReview);
  } catch (error) {
    S;
    next(error);
  }
});

ReviewRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.currentUserId;
    const { review } = req.body;

    const updateData = { review };

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
