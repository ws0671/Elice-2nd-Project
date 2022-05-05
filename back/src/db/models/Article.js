import { ArticleModel } from "../index";

const Article = {
  create: async ({ newArticle }) => {
    const createdNewArticle = await ArticleModel.create(newArticle);
    return createdNewArticle;
  },

  countArticles: async (filter) => {
    const articleCount = await ArticleModel.countDocuments(filter);
    return articleCount;
  },

  findAllByCategory: async (filter, page, skip = 10, limit = 10) => {
    const articles = await ArticleModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * skip)
      .limit(limit);

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

  updateLikes: async ({ filter, toUpdate }) => {
    await ArticleModel.updateMany(filter, toUpdate);
  },

  delete: async ({ articleId }) => {
    await ArticleModel.deleteOne({ articleId });
  },
};

export { Article };
