import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { categoryMiddleware } from "../middlewares/categoryMiddleware";
import { ArticleService } from "../services/articleService";

const ArticleRouter = Router();
ArticleRouter.use(loginRequired); // 게시판 기능은 무조건 회원가입

ArticleRouter.post("/", categoryMiddleware, async (req, res, next) => {
  try {
    const { category, title, body, tags } = req.body;
    const author = req.currentUserId;

    const newArticle = await ArticleService.addArticle({
      author,
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
    const category = req.query.category;
    const articles = await ArticleService.getArticles({ category });
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
});

ArticleRouter.get("/:articleId", async (req, res, next) => {
  try {
    const articleId = req.params.articleId;

    const articleInfo = await ArticleService.getArticleInfo({ articleId });

    res.status(200).json(articleInfo);
  } catch (error) {
    next(error);
  }
});

ArticleRouter.put("/:articleId", categoryMiddleware, async (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const author = req.currentUserId;

    const { category, title, body, tags } = req.body ?? null;

    const updateData = { category, title, body, tags };

    const updatedArticle = await ArticleService.updateArticle({
      articleId,
      author,
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

    res.status(204);
  } catch (error) {
    next(error);
  }
});

ArticleRouter.put("/:articleId/like", async (req, res, next) => {
  try {
    const userId = req.currentUserId; // 로그인 한 사용자
    const articleId = req.params.articleId; // 게시글 Id
    const author = req.body.author; // 게시글 작성자의 userId

    if (userId == author) {
      // 로그인 사용자 = 게시글 작성자이면
      throw new Error("본인 글에는 좋아요 할 수 없습니다.");
    } else {
      // 본인 게시글이 아니면
      const article = await ArticleService.like({ userId, articleId });

      res.status(200).send(article);
    }
  } catch (error) {
    next(error);
  }
});

export { ArticleRouter };
