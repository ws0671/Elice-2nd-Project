import { ReviewModel } from "../schemas/review";

const Review = {
  create: async ({ newReview }) => {
    const createdNewReview = await ReviewModel.create({ newReview });
    return createdNewReview;
  },
};

export { Review };
