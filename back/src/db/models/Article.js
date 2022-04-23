import { ArticleModel } from "../schemas/article"

const Article = {
  ceate: async ({ newArticle }) => {
    const createdNewArticle = await ArticleModel.create({ newArticle })
    return createdNewArticle
  },
}

export { Article }
