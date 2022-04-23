import { Article } from "../db"
import { v4 as uuidv4 } from "uuid"

const articleAuthService = {
  addArticle: async ({ author, category, title, content }) => {
    const articleId = uuidv4()

    const newArticle = { articleId, author, category, title, content }

    const createdNewArticle = await Article.create({ newArticle })

    return createdNewArticle
  },
}

export { articleAuthService }
