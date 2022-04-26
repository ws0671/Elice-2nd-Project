import is from "@sindresorhus/is"
import { Router } from "express"
import { loginRequired } from "../middlewares/loginRequired"
import { CommentService } from "../services/commentService"

const CommentRouter = Router()
CommentRouter.use(loginRequired)

// 댓글 작성
CommentRouter.post("/", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("req.body값이 존재하지 않습니다.")
    }

    const userId = req.currentUserId
    const { articleId, comment } = req.body
    const newComment = await CommentService.addComment({
      userId,
      articleId,
      comment,
    })

    res.status(201).json(newComment)
  } catch (err) {
    next(err)
  }
})

// 댓글 수정
CommentRouter.put("/:commentId", async (req, res, next) => {
  try {
    const userId = req.currentUserId
    const commentId = req.params.commentId
    const comment = req.body.comment

    const updateData = { comment }
    const newComment = await CommentService.setComment({
      userId,
      commentId,
      updateData,
    })

    res.status(200).send(newComment)
  } catch (err) {
    next(err)
  }
})

// 댓글 삭제(soft delete)
CommentRouter.put("/:commentId/delete", async (req, res, next) => {
  try {
    const userId = req.currentUserId
    const commentId = req.params.commentId
    const isDeleted = true

    const updateData = { isDeleted }
    const newComment = await CommentService.deleteComment({
      userId,
      commentId,
      updateData,
    })

    res.status(200).send(newComment)
  } catch (err) {
    next(err)
  }
})

export { CommentRouter }
