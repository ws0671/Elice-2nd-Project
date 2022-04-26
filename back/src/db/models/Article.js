import { ArticleModel } from "../schemas/article";

const Article = {
  create: async ({ newArticle }) => {
    const createdNewArticle = await ArticleModel.create(newArticle);
    return createdNewArticle;
  },

  findAll: async () => {
    const articles = await ArticleModel.find({});
    return articles;
  },

  findAllByCategory: async ({ category }) => {
    const articles = await ArticleModel.find({ category });
    return articles;
  },

  findById: async ({ articleId }) => {
    const article = await ArticleModel.findOne({ articleId });
    return article;
  },

  // 좋아요 개수, 좋아요 누른 사용자 목록 업데이트
  update: async ({ articleId, toUpdate }) => {
    const filter = { articleId }; // 바꿀 게시물
    const update = toUpdate;
    const option = { returnOriginal: false };

    const updateArticle = await ArticleModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updateArticle;
  },

  delete: async ({ aritcleId }) => {
    await ArticleModel.deleteOne({ aritcleId });
  },
};

export { Article };
