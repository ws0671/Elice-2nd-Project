import autoIncrement from "mongoose-auto-increment";
import { ArticleSchema } from "../schemas/article";

ArticleSchema.plugin(autoIncrement.plugin, {
  model: "Article",
  field: "articleId",
  startAt: 1, //시작
  increment: 1, // 증가
});

const makeModels = {
  ArticleModel: () => {
    const ArticleModel = model("Article", ArticleSchema);
    return ArticleModel;
  },
};

export { makeModels };
