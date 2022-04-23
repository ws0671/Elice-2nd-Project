import { ArticleModel } from "../schemas/article"

const Article = {
  create: async ({ newArticle }) => {
    const createdNewArticle = await ArticleModel.create({ newArticle })
    return createdNewArticle
  },
  findById: async ({ articleId }) => {
    const article = await ArticleModel.findOne({ articleId })
    return article
  },
}

export { Article }
