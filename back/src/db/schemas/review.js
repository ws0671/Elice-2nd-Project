import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    gameId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewModel = model("Review", ReviewSchema);

export { ReviewModel };
