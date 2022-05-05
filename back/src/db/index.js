import mongoose from "mongoose";
import { model } from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import { User } from "./models/User";
import { Game } from "./models/Game";
import { ArticleSchema } from "./schemas/article";
import { Article } from "./models/Article";
import { CommentSchema } from "./schemas/comment";
import { Comment } from "./models/Comment";
import { Like } from "./models/Like";
import { ReviewSchema } from "./schemas/review";
import { Review } from "./models/Review";
import { GameGenreGraph } from "./models/GameGenreGraph";
import { GameAgeGraph } from "./models/GameAgeGraph";
import { Point } from "./models/Point";

const DB_URL =
  process.env.MONGODB_URL ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;
autoIncrement.initialize(db);

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
);
db.on("error", (error) =>
  console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

ArticleSchema.plugin(autoIncrement.plugin, {
  model: "Article",
  field: "articleId",
  startAt: 1, //시작
  increment: 1, // 증가
});
CommentSchema.plugin(autoIncrement.plugin, {
  model: "Comment",
  field: "commentId",
  startAt: 1,
  increment: 1,
});
ReviewSchema.plugin(autoIncrement.plugin, {
  model: "Review",
  field: "reviewId",
  startAt: 1,
  increment: 1,
});

const makeModels = {
  ArticleModel: () => {
    const ArticleModel = model("Article", ArticleSchema);
    return ArticleModel;
  },
  CommentModel: () => {
    const CommentModel = model("Comment", CommentSchema);
    return CommentModel;
  },
  ReviewModel: () => {
    const ReviewModel = model("Review", ReviewSchema);
    return ReviewModel;
  },
  ResetCountExample: () => {
    const ArticleModel = model("Article", ArticleSchema),
      article = new ArticleModel();

    article.save((err) => {
      article.articleId === 0;
      article.nextCount((err, count) => {
        count === 1;
        article.resetCount((err, nextCount) => {
          nextCount === 0;
        });
      });
    });
    return ArticleModel;
  },
};

const ArticleModel = makeModels.ArticleModel();
const CommentModel = makeModels.CommentModel();
const ReviewModel = makeModels.ReviewModel();

export {
  ArticleModel,
  CommentModel,
  ReviewModel,
  User,
  Game,
  GameGenreGraph,
  GameAgeGraph,
  Article,
  Comment,
  Like,
  Review,
  Point,
};
