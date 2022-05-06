import { Schema, model } from "mongoose";

const GameRecommendSchema = new Schema(
  {
    gameId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    developer: {
      type: [String],
      required: true,
    },
    platforms: {
      type: [String],
      required: true,
    },
    requiredAge: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    genres: {
      type: String,
      required: true,
    },
    steamspyTags: {
      type: [String],
      required: true,
    },
    averagePlaytime: {
      type: Number,
      required: true,
    },
    medianPlaytime: {
      type: Number,
      required: true,
    },
    owners: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    headerImage: {
      type: String,
      required: true,
    },
    screenshots: {
      type: [String],
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    overallReview: {
      type: Number,
      required: true,
    },
    positiveRate: {
      type: Number,
      required: true,
    },
    negativeRate: {
      type: Number,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GameRecommendModel = model("GameRecommend", GameRecommendSchema);

export { GameRecommendModel };
