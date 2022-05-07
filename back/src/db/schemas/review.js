import { Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    reviewId: {
      type: Number,
      required: true,
    },
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
