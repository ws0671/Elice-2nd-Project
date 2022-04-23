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

export { articleAuthRouter }
