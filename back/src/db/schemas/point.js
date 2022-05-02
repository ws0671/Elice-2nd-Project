import { Schema, model } from "mongoose";

const PointSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    miniGame: {
      type: String,
      enum: ["Roulette", "CatMatch"],
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
