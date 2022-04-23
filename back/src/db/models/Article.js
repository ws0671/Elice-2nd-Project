import { ArticleModel } from "../schemas/article"

const Article = {
  create: async ({ newArticle }) => {
    const createdNewArticle = await ArticleModel.create(newArticle)
    return createdNewArticle
  },
  findById: async ({ articleId }) => {
    const article = await ArticleModel.findOne({ articleId })
    return article
  },
  update: async ({ articleId, updateObject }) => {
    const filter = { articleId }
    const update = { $set: updateObject }
    const option = { returnOriginal: false }

    const updatedArticle = await ArticleModel.findOneAndUpdate(
      filter,
      update,
      option
    )

    return updatedArticle
  },
  delete: async ({ aritcleId }) => {
    await ArticleModel.findOneAndDelete({ aritcleId })
  },
}

export { Article }
