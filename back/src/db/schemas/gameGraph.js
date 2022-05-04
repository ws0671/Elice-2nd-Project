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
      type: String,
      required: true,
    },
    genres: {
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

const GameGraphModel = model("GameGraph", GameGraphSchema);

export { GameGraphModel };
