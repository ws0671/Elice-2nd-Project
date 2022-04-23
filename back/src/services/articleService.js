import { Article } from "../db"
import { v4 as uuidv4 } from "uuid"

const articleAuthService = {
  addArticle: async ({ author, category, title, content }) => {
    const articleId = uuidv4()

    const newArticle = { articleId, author, category, title, content }

    const createdNewArticle = await Article.create({ newArticle })

    return createdNewArticle
  },
  getArticleInfo: async ({ articleId }) => {
    const article = await Article.findById({ articleId })

    if (!article) {
      throw new Error("존재하지 않는 게시물입니다.")
    }

    return article
  },
}

export { articleAuthService }
