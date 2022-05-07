import { ReviewModel } from "../index";

const Review = {
  create: async ({ newReview }) => {
    const createdNewReview = await ReviewModel.create(newReview);
    return createdNewReview;
  },

  findById: async ({ reviewId }) => {
    const review = await ReviewModel.findOne({ reviewId }).populate("writer");
    return review;
  },

  findAllByGame: async ({ gameId }) => {
    const reviews = await ReviewModel.find({ gameId });
    return reviews;
  },

  findAllByUser: async ({ userId }) => {
    const reviews = await ReviewModel.find({ userId });
    return reviews;
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

  delete: async ({ reviewId }) => {
    await ReviewModel.deleteOne({ reviewId });
  },
};

export { Review };
