import { Schema, model } from "mongoose"

const GameSchema = new Schema(
  {
    appId: {
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
      type: String,
      required: true,
    },
    developer: {
      type: String,
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
      type: String,
      required: true,
    },
    negativeRatings: {
      type: String,
      required: true,
    },
    averagePlaytime: {
      type: String,
      required: true,
    },
    medianPlaytime: {
      type: String,
      required: true,
    },
    owners: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    headerImage: {
      type: String,
      required: true,
    },
    screenshots: {
      type: [],
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    overallReview: {
      type: String,
      required: true,
    },
    positiveRate: {
      type: String,
      required: true,
    },
    negativeRate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const GameModel = model("Game", GameSchema)

export { GameModel }
