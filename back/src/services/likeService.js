import { Like, Article } from "../db";

const likeService = {
  addLike: async ({ userId, articleId }) => {
    const article = await Article.findById({ articleId });
    if (!article) {
      throw new Error("존재하지 않는 게시물입니다.");
    }

    const newLike = { userId, articleId };
    const like = await Like.findByFilter(newLike);

    if (like) {
      throw new Error("이미 좋아요를 누른 게시물입니다.");
    }

    await Like.create({ newLike });
    const toUpdate = { $inc: { like: 1 } };
    await Article.update({ articleId, toUpdate });
  },
};

export { likeService };
