import { ArticleModel } from "../index";

const Article = {
  create: async ({ newArticle }) => {
    const createdNewArticle = await ArticleModel.create(newArticle);
    return createdNewArticle;
  },

  findAllByCategory: async (
    filter,
    page,
    numOfPageSkip = 10,
    numOfPageLimit = 10
  ) => {
    const articleCount = await ArticleModel.countDocuments(filter);
    const articles = await ArticleModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * numOfPageSkip)
      .limit(numOfPageLimit);

    return { articleCount, articles };
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

  delete: async ({ articleId }) => {
    await ArticleModel.deleteOne({ articleId });
  },
};

export { Article };
