import { Comment, User } from "../db"
import { v4 as uuidv4 } from "uuid"
import { SetUtil } from "../common/setUtil"

const CommentService = {
  addComment: async ({ userId, articleId, comment }) => {
    const id = uuidv4()

    const user = await User.findById({ userId })
    const writerNickname = user.nickname

    const newComment = {
      id,
      articleId,
      writerId: userId, // 작성자 = 현재 로그인한 사용자
      writerNickname,
      comment,
    }
    const createNewComment = await Comment.create({ newComment })
    return createNewComment
  },

  setComment: async ({ userId, commentId, toUpdate }) => {
    let comment = await Comment.findById({ commentId })

    if (!comment) {
      throw new Error(
        "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
      )
    }

    if (userId !== comment.userId) {
      throw new Error("당신은 이 댓글의 작성자가 아닙니다.")
    }

    console.log(toUpdate)
    const updateObject = SetUtil.compareValues(toUpdate, comment)
    console.log(updateObject)
    comment = await Comment.update({ commentId, updateObject })
    return comment
  },

  deleteComment: async ({ userId, commentId, toUpdate }) => {
    let comment = await Comment.findById({ commentId })

    if (!commentId) {
      throw new Error(
        "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
      )
    }

    if (userId !== comment.userId) {
      throw new Error(
        "당신은 댓글 작성자가 아닙니다. 댓글을 삭제할 수 없습니다!"
      )
    }

    toUpdate.comment = "삭제된 댓글입니다."
    const updateObject = SetUtil.compareValues(toUpdate, comment)
    comment = await Comment.delete({ commentId, updateObject })
    return comment
  },
}

export default { CommentService }
