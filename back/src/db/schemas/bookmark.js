import { Schema, model } from "mongoose";

const BookmarkSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  appId: {
    type: String,
    required: true,
  },
});

const BookmarkModel = model("Bookmark", BookmarkSchema);

export { BookmarkModel };
