import { redisClient, DEFAULT_EXPIRATION } from "../db";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { UserAuthService } from "../services/userService";
import { body, validationResult } from "express-validator";

const UserAuthRouter = Router();

UserAuthRouter.post(
  "/register",
  body("email").isEmail().withMessage("이메일 형식이 올바르지 않습니다."),
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("8 ~ 16자리 비밀번호를 입력해주세요"),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMsg = errors.errors[0].msg;
        throw new Error(errorMsg);
      }

      const { nickname, email, password } = req.body;
      // 특수문자 포함 검사
      const REGEX = /^(?=.*[!@#\$%\^&\*]).{8,}$/;
      console.log(REGEX.test(password));
      if (REGEX.test(password)) {
        // 위 데이터를 유저 db에 추가하기
        const newUser = await UserAuthService.addUser({
          nickname,
          email,
          password,
        });

        res.status(201).json(newUser);
      } else {
        throw new Error(
          "비밀번호에는 최소 한 개의 특수문자가 포함돼야 합니다."
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

UserAuthRouter.post("/login", async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const { email, password } = req.body;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await UserAuthService.getUser({ email, password });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

UserAuthRouter.post("/emailVerify", async (req, res, next) => {
  try {
    const email = req.body.email;

    const user = await UserAuthService.getUserAndCode({ email });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

UserAuthRouter.get("/:userId/myPage", loginRequired, async (req, res, next) => {
  try {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const loginId = req.currentUserId;
    const userId = req.params.userId;
    const criteria = req.query.criteria ? req.query.criteria : undefined; // positiveRate or averagePlaytime
    const page = req.query.page ? Number(req.query.page) : undefined;

    if (loginId === userId) {
      if (!criteria) {
        // 기준이 없고
        if (!page) {
          // page도 없으면 전체 myPage 정보 return
          // redis 서버에서 캐시 확인
          const cache = await redisClient.GET(`myPage`);
          if (cache) {
            // 캐시가 있으면
            res.status(200).json(JSON.parse(cache));
          } else {
            // 캐시가 없으면
            const currentUserInfo = await UserAuthService.getUserInfo({
              userId,
            });

            await redisClient.SETEX(
              `myPage`,
              DEFAULT_EXPIRATION,
              JSON.stringify(currentUserInfo)
            );
            res.status(200).send(currentUserInfo);
          }
        } else {
          // page만 있으면 pagenation 한 전체 북마크 게임 정보 return
          const bookmarksInfo = await UserAuthService.getAllBookmarks({
            userId,
            page,
          });

          res.status(200).send(bookmarksInfo);
        }
      } else {
        // 기준 있으면 정렬된 북마크 정보만 return
        const sortedBookmarksInfo = await UserAuthService.getSortedBookmarks({
          userId,
          criteria,
          page,
        });

        res.status(200).send(sortedBookmarksInfo);
      }
    }
  } catch (error) {
    next(error);
  }
});

UserAuthRouter.put(
  "/:userId/nickname",
  loginRequired,
  async (req, res, next) => {
    try {
      // URI로부터 사용자 id를 추출함.
      const loginId = req.currentUserId;
      const userId = req.params.userId;
      if (loginId === userId) {
        // body data로부터 업데이트할 사용자 정보를 추출함.
        const nickname = req.body.nickname;
        const updateData = { nickname };

        // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedUser = await UserAuthService.updateNickname({
          userId,
          updateData,
        });

        res.status(200).json(updatedUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

UserAuthRouter.put(
  "/:userId/password",
  loginRequired,
  async (req, res, next) => {
    try {
      const loginId = req.currentUserId;
      const userId = req.params.userId;
      if (loginId === userId) {
        const password = req.body.password;
        const updateData = { password };

        const updatedUser = await UserAuthService.updatePassword({
          userId,
          updateData,
        });

        res.status(200).json(updatedUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

UserAuthRouter.put("/missingPassword", async (req, res, next) => {
  try {
    const { email, verified, password } = req.body;
    console.log(email, verified, password);
    const updateData = { password };

    if (!verified) {
      throw new Error("인증이 완료되지 않았습니다.");
    }

    const updatedUser = await UserAuthService.resetPassword({
      email,
      updateData,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

UserAuthRouter.delete("/:userId", loginRequired, async (req, res, next) => {
  try {
    const loginId = req.currentUserId;
    const userId = req.params.userId;
    if (loginId === userId) {
      const result = await UserAuthService.deleteUser({ userId });

      res.status(204).send(result);
    }
  } catch (error) {
    next(error);
  }
});

// 포인트 적립
UserAuthRouter.put(
  "/:userId/addPoint",
  loginRequired,
  async (req, res, next) => {
    try {
      const loginId = req.currentUserId;
      const userId = req.params.userId;

      if (loginId === userId) {
        const point = req.body.point;

        const updatedUser = await UserAuthService.addPoint({
          userId,
          point,
        });

        res.status(200).send(updatedUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

// 게임 북마크/북마크 취소
UserAuthRouter.put(
  "/:userId/addBookmark",
  loginRequired,
  async (req, res, next) => {
    try {
      const loginId = req.currentUserId;
      const userId = req.params.userId;
      if (loginId === userId) {
        const { bookmark, gameId } = req.body;

        const updatedUser = await UserAuthService.addBookmark({
          bookmark,
          userId,
          gameId,
        });

        res.status(200).send(updatedUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
UserAuthRouter.get("/afterlogin", loginRequired, (req, res, next) => {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { UserAuthRouter };
