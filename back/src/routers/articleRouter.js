import { Router } from "express"
import { loginRequired } from "../middlewares/loginRequired"
import { articleAuthService } from "../services/articleService"

const articleAuthRouter = Router()

articleAuthRouter.post(
  "/article/create",
  loginRequired,
  async (req, res, next) => {
    try {
      const { author, category, title, content } = req.body

      const newArticle = await articleAuthService.addArticle({
        author,
        category,
        title,
        content,
      })

      res.status(201).json(newArticle)
    } catch (error) {
      next(error)
    }
  }
)

articleAuthRouter.get("/article/:articleId", async (req, res, next) => {
  try {
    const articleId = req.params.articleId

    const articleInfo = await articleAuthService.getArticleInfo({ articleId })

    res.status(200).json(articleInfo)
  } catch (error) {
    next(error)
  }
})

articleAuthRouter.put(
  "/article/:articleId",
  loginRequired,
  async (req, res, next) => {
    try {
      const articleId = req.params.articleId

      const { author, category, title, content, tags } = req.body ?? null

      const toUpdate = { category, title, content, tags }

      const updatedArticle = await articleAuthService.setArticle({
        articleId,
        author,
        toUpdate,
      })

      res.status(200).json(updatedArticle)
    } catch (error) {
      next(error)
    }
  }
)

export { articleAuthRouter }
