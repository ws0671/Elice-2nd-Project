import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { LikeService } from "../services/reviewService";

const LikeRouter = Router();
LikeRouter.use(loginRequired);

LikeRouter.post("/", async (req, res, next) => {
  try {
    const userId = req.currentUserId; // 로그인 한 사용자
    const { articleId, author } = req.body; // 게시글의 Id, 게시글 작성자의 userId

    if (userId == author) {
      // 로그인 사용자 = 게시글 작성자이면
      throw new Error("본인 글에는 좋아요 할 수 없습니다.");
    } else {
      // 본인 게시글이 아니면
      await LikeService.addLike({
        userId,
        articleId,
      });

      res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
});

export { LikeRouter };
