import { Article, Like, Comment, User } from "../db";
import { SetUtil } from "../common/SetUtil";

const ArticleService = {
  addArticle: async ({ userId, category, title, body, tags }) => {
    if (!SetUtil.validateCategory(category)) {
      throw new Error("잘못된 말머리를 선택하셨습니다.");
    }

    const user = await User.findById({ userId });
    const permission = SetUtil.validatePermission(user.grade, category);
    if (!permission) {
      throw new Error("귀하는 해당 말머리를 선택할 수 없는 등급입니다.");
    }

    const author = userId;
    const nickname = user.nickname;
    const categoryName = SetUtil.convertCategory(category);
    const newArticle = {
      author,
      nickname,
      category,
      categoryName,
      title,
      body,
      tags,
    };

    const createdNewArticle = await Article.create({ newArticle });
    return createdNewArticle;
  },

  getArticles: async ({ category, page, limit, skip }) => {
    if ((category !== null) & !SetUtil.validateCategory(category)) {
      throw new Error("잘못된 말머리를 선택하셨습니다.");
    }

    let filter;
    if (category == null) {
      filter = {};
    } else {
      filter = { category };
    }

    const articleCount = await Article.countArticles(filter);
    const articles = await Article.findAllByCategory(filter, page, limit, skip);

    return { articleCount, articles };
  },

  getArticleInfo: async ({ articleId, userId }) => {
    let article = await Article.findById({ articleId });
    const user = await User.findById({ userId });

    if (!article) {
      throw new Error("존재하지 않는 게시물입니다.");
    }

    const permission = SetUtil.validatePermission(user.grade, article.category);

    if (permission) {
      const likeOrNot = await Like.findByFilter({ articleId, userId });
      const like = Boolean(likeOrNot);
      const comments = await Comment.findAllByArticle({ articleId });
      if (article.author === userId) {
        const articleInfo = { article, like, comments };

        return articleInfo;
      } else {
        // 본인이 작성한 글이 아닐 때만 조회수 증가
        const toUpdate = { $inc: { hits: 1 } };
        article = await Article.update({ articleId, toUpdate });

        const articleInfo = { article, like, comments };

        return articleInfo;
      }
    } else {
      throw new Error(
        "게시글에 접근 권한이 없습니다. 포인트를 쌓아 등업해주세요."
      );
    }
  },

  updateArticle: async ({ articleId, author, category, updateData }) => {
    if (!SetUtil.validateCategory(updateData.category)) {
      throw new Error("잘못된 말머리를 선택하셨습니다.");
    }

    let article = await Article.findById({ articleId });

    if (!article) {
      throw new Error("존재하지 않는 게시물입니다.");
    } else if (article.author !== author) {
      throw new Error("수정 권한이 없는 게시물입니다.");
    }
    const categoryName = SetUtil.convertCategory(category);
    updateData["categoryName"] = categoryName;
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

    await Like.deleteAllByArticle({ articleId }); // 해당 게시글의 좋아요 전체 삭제
    await Article.delete({ articleId });
  },
};

export { ArticleService };
