import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    point: {
      type: Number,
      default: 0,
    },
    grade: {
      type: Number,
      default: 0,
    },
    bookmarks: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
