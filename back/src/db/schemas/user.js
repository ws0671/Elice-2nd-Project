import { Schema, model } from "mongoose"
// import autoIncrement from "mongoose-auto-increment"

const UserSchema = new Schema(
  {
    // id: {
    //   type: Number,
    //   default: 0,
    // },
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
    bookmarks: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const UserModel = model("User", UserSchema)
export { UserModel }

// UserSchema.plugin(autoIncrement.plugin, {
//   model: "User",
//   field: "id",
//   startAt: 1, //시작
//   increment: 1, // 증가
// })
