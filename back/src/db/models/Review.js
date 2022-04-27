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

  update: async ({ reviewId, toUpdate }) => {
    const filter = { reviewId };
    const update = toUpdate;
    const option = { returnOriginal: false };
    const updateReview = await ReviewModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updateReview;
  },
};

export { Review };