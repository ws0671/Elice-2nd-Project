import { Article } from "../db"
import { v4 as uuidv4 } from "uuid"
import { SetUtil } from "../common/setUtil"

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
  setArticle: async ({ articleId, author, toUpdate }) => {
    let article = await Article.findById({ articleId })

    if (!article) {
      throw new Error("존재하지 않는 게시물입니다.")
    } else if (article.author !== author) {
      throw new Error("수정권한이 없는 게시물입니다.")
    }

    const updateObject = SetUtil.compareValues(toUpdate, article)

    article = await User.update({ articleId, updateObject })
  },
  deleteArticle: async ({ articleId, author }) => {
    const article = await Article.findById({ articleId })

    if (!article) {
      throw new Error("존재하지 않는 게시물입니다.")
    } else if (article.author !== author) {
      throw new Error("삭제 권한이 없는 게시물입니다.")
    }

    await Article.delete({ articleId })
  },
}

export { articleAuthService }
