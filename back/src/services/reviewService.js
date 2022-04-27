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

  updateReview: async ({ reviewId, userId, updateData }) => {
    let review = await Review.findById({ reviewId });

    if (!review) {
      throw new Error("존재하지 않는 리뷰입니다.");
    } else if (review.userId !== userId) {
      throw new Error("수정 권한이 없는 리뷰입니다.");
    }

    const toUpdate = SetUtil.compareValues(updateData, review);
    review = await Review.update({ reviewId, toUpdate });
    return review;
  },
};

export { ReviewService };
