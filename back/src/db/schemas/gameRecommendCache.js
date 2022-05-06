import { Schema, model } from "mongoose";

const gameRecommendCacheSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    answer: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GameRecommendCacheModel = model(
  "GameRecommendCache",
  gameRecommendCacheSchema
);

export { GameRecommendCacheModel };
