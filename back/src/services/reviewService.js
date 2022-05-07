import { Review, User } from "../db";
import { SetUtil } from "../common/setUtil";

const ReviewService = {
  addReview: async ({ userId, gameId, review }) => {
    if (review.length < 20) {
      throw new Error("리뷰는 20자 이상 적어야합니다.");
    }
    let writer = await User.findById({ userId });

    const newReview = { writer, gameId, review };

    const createdNewReview = await Review.create({ newReview });

    const { toUpdate, isUpgraded } = SetUtil.setPointAndGrade(writer, 250);

    writer = await User.update({ userId, toUpdate });

    return createdNewReview;
  },

  updateReview: async ({ reviewId, userId, updateData }) => {
    if (updateData.review.length < 20) {
      throw new Error("리뷰는 20자 이상 적어야합니다.");
    }

    let review = await Review.findById({ reviewId });

    if (!review) {
      throw new Error("존재하지 않는 리뷰입니다.");
    } else if (review.writer.userId !== userId) {
      throw new Error("수정 권한이 없는 리뷰입니다.");
    }

    const toUpdate = SetUtil.compareValues(updateData, review);
    review = await Review.update({ reviewId, toUpdate });
    return review;
  },

  deleteReview: async ({ reviewId, userId }) => {
    const review = await Review.findById({ reviewId });

    if (!review) {
      throw new Error("존재하지 않는 리뷰입니다.");
    } else if (review.userId !== userId) {
      throw new Error("삭제 권한이 없는 리뷰입니다.");
    }

    await Review.delete({ reviewId });
  },
};

export { ReviewService };
