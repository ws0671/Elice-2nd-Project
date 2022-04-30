import { Comment, User } from "../db";
import { SetUtil } from "../common/setUtil";

const CommentService = {
  addComment: async ({ userId, articleId, comment }) => {
    const user = await User.findById({ userId });
    const writerNickname = user.nickname;
    const newComment = {
      articleId,
      writerId: userId, // 작성자 = 현재 로그인한 사용자
      writerNickname,
      comment,
    };
    const createNewComment = await Comment.create({ newComment });
    return createNewComment;
  },

  updateComment: async ({ userId, commentId, updateData }) => {
    let comment = await Comment.findById({ commentId });

    if (!comment) {
      throw new Error(
        "해당 id를 가진 댓글 데이터는 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    if (userId !== comment.writerId) {
      throw new Error("당신은 이 댓글의 작성자가 아닙니다.");
    }
    if (comment.isDeleted) {
      throw new Error("이미 삭제된 댓글입니다.");
    }

    const toUpdate = SetUtil.compareValues(updateData, comment);
    comment = await Comment.update({ commentId, toUpdate });
    return comment;
  },

  deleteComment: async ({ userId, commentId, updateData }) => {
    let comment = await Comment.findById({ commentId });

    if (!commentId) {
      throw new Error(
        "해당 id를 가진 댓글 데이터는 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    if (userId !== comment.writerId) {
      throw new Error("당신은 이 댓글의 작성자가 아닙니다.");
    }
    if (comment.isDeleted) {
      throw new Error("이미 삭제된 댓글입니다.");
    }

    const toUpdate = SetUtil.compareValues(updateData, comment);
    comment = await Comment.update({ commentId, toUpdate });

    return comment;
  },
};

export { CommentService };
