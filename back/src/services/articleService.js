import { User } from "../db";
import { Article, Like } from "../db";
import { v4 as uuidv4 } from "uuid";
import { SetUtil } from "../common/setUtil";

const ArticleService = {
  addArticle: async ({ author, category, title, body, tags }) => {
    if (!SetUtil.validateCategory(category)) {
      throw new Error("잘못된 말머리를 선택하셨습니다.");
    }

    const articleId = uuidv4();

    const newArticle = { articleId, author, category, title, body, tags };

    const createdNewArticle = await Article.create({ newArticle });

    return createdNewArticle;
  },

  getArticles: async ({ category, page, numOfPageSkip, numOfPageLimit }) => {
    if ((category !== null) & !SetUtil.validateCategory(category)) {
      throw new Error("잘못된 말머리를 선택하셨습니다.");
    }

    let filter;
    if (category == null) {
      filter = {};
    } else {
      filter = { category };
    }

    const articles = await Article.findAllByCategory(
      filter,
      page,
      numOfPageSkip,
      numOfPageLimit
    );
    return articles;
  },

  getArticleInfo: async ({ articleId }) => {
    const article = await Article.findById({ articleId });

    if (!article) {
      throw new Error("존재하지 않는 게시물입니다.");
    }

    return article;
  },

  updateArticle: async ({ articleId, author, updateData }) => {
    if (!SetUtil.validateCategory(category)) {
      throw new Error("잘못된 말머리를 선택하셨습니다.");
    }

    let article = await Article.findById({ articleId });

    if (!article) {
      throw new Error("존재하지 않는 게시물입니다.");
    } else if (article.author !== author) {
      throw new Error("수정 권한이 없는 게시물입니다.");
    }

    const toUpdate = SetUtil.compareValues(updateData, article);

    article = await Article.update({ articleId, toUpdate });

    return article;
  },

  deleteArticle: async ({ articleId, author }) => {
    const article = await Article.findById({ articleId });

    if (!article) {
      throw new Error("존재하지 않는 게시물입니다.");
    } else if (article.author !== author) {
      throw new Error("삭제 권한이 없는 게시물입니다.");
    }

    await Article.delete({ articleId });
  },

  // 게시글 좋아요
  like: async ({ userId, articleId, likeOrNot }) => {
    const article = await Article.findById({ articleId }); // 좋아요 할 게시글 객체 찾기
    if (!article) {
      throw new Error(
        "해당 id를 가진 게시글 데이터는 없습니다. 다시 한 번 확인해주세요."
      );
    }

    const filter = { userId, articleId };
    const like = await Like.findByFilter(filter);

    if (likeOrNot) {
      if (like) {
        throw new Error("이미 좋아요를 누른 게시물입니다.");
      }
      const likeId = uuidv4();
      const newLike = { likeId, userId, articleId };
      await Like.create({ newLike });
    } else {
      if (!like) {
        throw new Error(
          "이미 좋아요 취소가 되었거나 좋아요를 누르지 않은 게시물입니다."
        );
      }
      await Like.delete(filter);
    }
  },

  getLikes: async ({ articleId }) => {
    const article = await Article.findById({ articleId });
    if (!article) {
      throw new Error("존재하지 않는 게시글입니다.");
    }

    const likes = await Like.findAllByArticle({ articleId });
    return likes;
  },
};

export { ArticleService };
