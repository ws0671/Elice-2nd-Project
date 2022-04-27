import { Review } from "../db";
import { v4 as uuidv4 } from "uuid";
import { SetUtil } from "../common/setUtil";

const ReviewService = {
  addReview: async ({ userId, gameId, content }) => {
    const reviewId = uuidv4();
    const newReview = { reviewId, userId, gameId, content };

    const createdNewReview = await Review.create({ newReview });
    return createdNewReview;
  },
};

export { ReviewService };
