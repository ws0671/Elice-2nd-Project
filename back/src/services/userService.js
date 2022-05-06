import { User, Game, Review, Like, Article } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { sendMail } from "./mailService";
import { SetUtil } from "../common/setUtil";

const userAuthService = {
  addUser: async ({ nickname, email, password }) => {
    // 이메일 중복 확인
    const userEmail = await User.findByEmail({ email });
    if (userEmail) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    const userNickname = await User.findByNickname({ nickname });
    if (userNickname) {
      throw new Error(
        "이 닉네임은 현재 사용중입니다. 다른 닉네임을 입력해 주세요."
      );
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const userId = uuidv4();
    const newUser = { userId, nickname, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.create({ newUser });

    return createdNewUser;
  },

  getUser: async ({ email, password }) => {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.userId }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const { userId, nickname, bookmarks } = user;

    const loginUser = {
      token,
      userId,
      email,
      nickname,
      bookmarks,
      errorMessage: null,
    };

    return loginUser;
  },

  updateNickname: async ({ userId, updateData }) => {
    let user = await User.findById({ userId });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    // 닉네임 중복 검사
    const findByNicknameUser = await User.findByNickname({
      nickname: updateData.nickname,
    });
    if (findByNicknameUser && findByNicknameUser.userId != userId) {
      throw new Error(
        "이 닉네임은 현재 사용중입니다. 다른 닉네임을 입력해 주세요."
      );
    }

    const toUpdate = SetUtil.compareValues(updateData, user);
    user = await User.update({ userId, toUpdate });

    return user;
  },

  updatePassword: async ({ userId, updateData }) => {
    let user = await User.findById({ userId });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    const hashedPassword = await bcrypt.hash(updateData.password, 10);
    updateData.password = hashedPassword;

    const toUpdate = SetUtil.compareValues(updateData, user);
    user = await User.update({ userId, toUpdate });

    return user;
  },

  getUserInfo: async ({ userId }) => {
    const user = await User.findById({ userId });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    const bookmarkList = user.bookmarks;
    const bookmarks = await Game.findAllBookmarks({ bookmarkList, page: 1 });
    const reviews = await Review.findAllByUser({ userId });

    return { user, bookmarks, reviews };
  },

  getUserAndCode: async ({ email }) => {
    const user = await User.findByEmail({ email });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    const subject = "[GAME PEARL] 인증코드";
    const text = `귀하의 인증코드는 ${code} 입니다. 인증 후 비밀번호를 변경해주세요.`;
    await sendMail(email, subject, text);

    return { user, code };
  },

  getAllBookmarks: async ({ userId, page }) => {
    const user = await User.findById({ userId });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    const bookmarkList = user.bookmarks;
    const bookmarks = await Game.findAllBookmarks({
      page,
      bookmarkList,
    });

    return bookmarks;
  },

  getSortedBookmarks: async ({ userId, criteria, page }) => {
    const user = await User.findById({ userId });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    const bookmarkList = user.bookmarks;
    const bookmarks = await Game.findSortedBookmarks({
      page,
      bookmarkList,
      criteria,
    });

    return bookmarks;
  },

  deleteUser: async ({ userId }) => {
    const isDataDeleted = await User.deleteById({ userId });

    if (!isDataDeleted) {
      throw new Error(
        "해당하는 회원 정보가 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    const likes = await Like.findAllByUser({ userId }); // 유저 좋아요한 내역 조회
    const likeArticleIds = likes.map((like) => like.articleId); // 좋아요 내역에서 게시글 아이디만 빼서 배열로 만듦

    const filter = { articleId: { $in: likeArticleIds } };
    const toUpdate = { $inc: { like: -1 } };
    await Article.updateLikes({ filter, toUpdate });

    await Like.deleteAllByUser({ userId });

    return { status: "ok" };
  },

  addPoint: async ({ userId, point }) => {
    let user = await User.findById({ userId });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    const { toUpdate, isUpgraded } = SetUtil.setPointAndGrade(user, point);

    user = await User.update({ userId, toUpdate });

    return { user, isUpgraded };
  },

  addBookmark: async ({ bookmark, userId, gameId }) => {
    let user = await User.findById({ userId });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    let toUpdate;
    if (bookmark) {
      // 북마크
      toUpdate = {
        $addToSet: {
          bookmarks: gameId,
        },
      };
    } else {
      // 북마크 취소
      toUpdate = {
        $pull: {
          bookmarks: gameId,
        },
      };
    }

    user = await User.update({ userId, toUpdate });

    return user;
  },

  getBookmarkList: async ({ userId }) => {
    const user = await User.findById({ userId });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    const bookmarks = user.bookmarks;
    // TODO : 북마크에 해당하는 게임 정보들을 gameService 메소드로 가져와서 객체들의 배열로 넘겨줄 것인가

    return bookmarks;
  },
};

export { userAuthService };
