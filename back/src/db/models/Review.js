import { ReviewModel } from "../schemas/review";

const Review = {
  create: async ({ newReview }) => {
    const createdNewReview = await ReviewModel.create({ newReview });
    return createdNewReview;
  },
  findById: async ({ reviewId }) => {
    const review = await ReviewModel.findOne({ reviewId });
    return review;
  },
};

export { Review };
