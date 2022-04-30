import { Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    reviewId: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    gameId: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export { ReviewSchema };
