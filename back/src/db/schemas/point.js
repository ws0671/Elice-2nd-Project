import { Schema, model } from "mongoose";

const PointSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      enum: ["Roulette", "CatMatch", "SnakeGame", "2048"],
      required: true,
    },
    point: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PointModel = model("Point", PointSchema);

export { PointModel };
