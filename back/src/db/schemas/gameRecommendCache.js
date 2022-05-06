import { Schema, model } from "mongoose";

const GameRecommendCacheSchema = new Schema(
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
  GameRecommendCacheSchema
);

export { GameRecommendCacheModel };
