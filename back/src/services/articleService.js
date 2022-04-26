import { User } from "../db";
import { Article } from "../db";
import { v4 as uuidv4 } from "uuid";
import { SetUtil } from "../common/setUtil";

const ArticleService = {
  addArticle: async ({ author, category, title, content, tags }) => {
    const articleId = uuidv4();

    const newArticle = { articleId, author, category, title, content, tags };

    const createdNewArticle = await Article.create({ newArticle });

    return createdNewArticle;
  },

  getArticles: async ({ category }) => {
    let articles;
    if (category == null) {
      articles = await Article.findAll();
    } else {
      articles = await Article.findAllByCategory({ category });
    }
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
  like: async ({ userId, articleId }) => {
    const user = await User.findById({ userId });
    if (!user) {
      throw new Error("당신은 회원이 아닙니다.");
    }
    let article = await Article.findById({ articleId }); // 좋아요 할 게시글 객체 찾기
    if (!article) {
      throw new Error(
        "해당 id를 가진 게시글 데이터는 없습니다. 다시 한 번 확인해주세요."
      );
    }
    let toUpdate;
    const likeUserIdList = article.likes; // 좋아요 누른 사용자들의 목록
    if (likeUserIdList.includes(userId)) {
      // 이미 좋아요 한 상태이면
      toUpdate = {
        $pull: {
          likes: userId,
        },
      };
    } else {
      // 좋아요 안 누른 상태이면
      toUpdate = {
        $push: {
          likes: userId,
        },
      };
    }
    article = await Article.update({ articleId, toUpdate });

    return article;
  },
};

export { ArticleService };
