import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { ArticleService } from "../services/articleService";

const ArticleRouter = Router();
ArticleRouter.use(loginRequired); // 게시판 기능은 무조건 회원가입

ArticleRouter.post("/", async (req, res, next) => {
  try {
    const { category, title, body, tags } = req.body;
    const userId = req.currentUserId;
    const newArticle = await ArticleService.addArticle({
      userId,
      category,
      title,
      body,
      tags,
    });

    res.status(201).json(newArticle);
  } catch (error) {
    next(error);
  }
});

ArticleRouter.get("/", async (req, res, next) => {
  try {
    const category = req.query.category ?? null;
    const page = Number(req.query.page);
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const skip = req.query.skip ? Number(req.query.skip) : undefined;

    const articles = await ArticleService.getArticles({
      category,
      page,
      limit,
      skip,
    });
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
});

ArticleRouter.get("/:articleId", async (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const userId = req.currentUserId;

    const articleInfo = await ArticleService.getArticleInfo({
      articleId,
      userId,
    });

    res.status(200).json(articleInfo);
  } catch (error) {
    next(error);
  }
});

ArticleRouter.put("/:articleId", async (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const author = req.currentUserId;

    const { category, title, body, tags } = req.body ?? null;

    const updateData = { category, title, body, tags };

    const updatedArticle = await ArticleService.updateArticle({
      articleId,
      author,
      category,
      updateData,
    });

    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
});

ArticleRouter.delete("/:articleId", async (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const author = req.currentUserId;

    await ArticleService.deleteArticle({ articleId, author });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export { ArticleRouter };
