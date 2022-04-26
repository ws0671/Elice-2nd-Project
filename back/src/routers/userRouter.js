import is from "@sindresorhus/is"
import { Router } from "express"
import { loginRequired } from "../middlewares/loginRequired"
import { userAuthService } from "../services/userService"

const userAuthRouter = Router()

userAuthRouter.post("/register", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      )
    }

    // req (request) 에서 데이터 가져오기
    const { nickname, email, password } = req.body

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      nickname,
      email,
      password,
    })

    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

userAuthRouter.post("/login", async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const { email, password } = req.body

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password })

    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

userAuthRouter.get("/:userId", loginRequired, async (req, res, next) => {
  try {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const loginId = req.currentUserId
    const userId = req.params.userId
    if (loginId === userId) {
      const currentUserInfo = await userAuthService.getUserInfo({
        userId,
      })

      res.status(200).send(currentUserInfo)
    }
  } catch (error) {
    next(error)
  }
})

userAuthRouter.put("/:userId", loginRequired, async (req, res, next) => {
  try {
    // URI로부터 사용자 id를 추출함.
    const loginId = req.currentUserId
    const userId = req.params.userId
    if (loginId === userId) {
      // body data로부터 업데이트할 사용자 정보를 추출함.
      const { nickname, email, password, bookmarks } = req.body ?? null
      const updateData = { nickname, email, password, bookmarks }

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.updateUser({
        userId,
        updateData,
      })

      res.status(200).json(updatedUser)
    }
  } catch (error) {
    next(error)
  }
})

userAuthRouter.delete("/:userId", loginRequired, async (req, res, next) => {
  try {
    const loginId = req.currentUserId
    const userId = req.params.userId
    if (loginId === userId) {
      const result = await userAuthService.deleteUser({ userId })

      res.status(200).send(result)
    }
  } catch (error) {
    next(error)
  }
})
// 게임 북마크/북마크 취소
userAuthRouter.put(
  "/:userId/addBookmark",
  loginRequired,
  async (req, res, next) => {
    try {
      const loginId = req.currentUserId
      const userId = req.params.userId
      if (loginId === userId) {
        const gameId = req.body.gameId

        const updatedUser = await userAuthService.addBookmark({
          userId,
          gameId,
        })

        res.status(200).send(updatedUser)
      }
    } catch (error) {
      next(error)
    }
  }
)

// 사용자별 북마크 리스트
userAuthRouter.get(
  "/:userId/bookmarks",
  loginRequired,
  async (req, res, next) => {
    try {
      const loginId = req.currentUserId
      const userId = req.params.userId
      if (loginId === userId) {
        const bookmarkList = await userAuthService.getBookmarkList({ userId })

        res.status(200).send(bookmarkList)
      }
    } catch (error) {
      next(error)
    }
  }
)

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", loginRequired, (req, res, next) => {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    )
})

export { userAuthRouter }
