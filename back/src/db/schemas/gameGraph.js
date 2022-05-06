import { Schema, model } from "mongoose";

const GameGraphSchema = new Schema(
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
      type: Date,
      required: true,
    },
    english: {
      type: Number,
      required: true,
    },
    developer: {
      type: [String],
      required: true,
    },
    publisher: {
      type: String,
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
    achievements: {
      type: Number,
      required: true,
    },
    positiveRatings: {
      type: Number,
      required: true,
    },
    negativeRatings: {
      type: Number,
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
  },
  {
    timestamps: true,
  }
);

const GameAgeGraphModel = model("GameAgeGraph", GameGraphSchema);
const GameRatingGraphModel = model("GameRatingGraph", GameGraphSchema);
export { GameAgeGraphModel, GameRatingGraphModel };
