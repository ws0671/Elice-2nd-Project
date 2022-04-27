import { User } from "../db" // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import jwt from "jsonwebtoken"
const { SetUtil } = require("../common/setUtil")

const userAuthService = {
  addUser: async ({ nickname, email, password }) => {
    // 이메일 중복 확인
    const userEmail = await User.findByEmail({ email })
    if (userEmail) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      return { errorMessage }
    }

    const userNickname = await User.findByNickname({ nickname })
    if (userNickname) {
      const errorMessage =
        "이 닉네임은 현재 사용중입니다. 다른 닉네임을 입력해 주세요."
      return { errorMessage }
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10)

    // id 는 유니크 값 부여
    const userId = uuidv4()
    const newUser = { userId, nickname, email, password: hashedPassword }

    // db에 저장
    const createdNewUser = await User.create({ newUser })

    return createdNewUser
  },

  getUser: async ({ email, password }) => {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email })
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      )
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    )
    if (!isPasswordCorrect) {
      throw new Error("비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.")
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key"
    const token = jwt.sign({ user_id: user.userId }, secretKey)

    // 반환할 loginuser 객체를 위한 변수 설정
    const { userId, nickname, bookmarks } = user

    const loginUser = {
      token,
      userId,
      email,
      nickname,
      bookmarks,
      errorMessage: null,
    }

    return loginUser
  },

  updateUser: async ({ userId, updateData }) => {
    let user = await User.findById({ userId })
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      )
    }
    // 닉네임 중복 검사
    const findByNicknameUser = await User.findByNickname({
      nickname: updateData.nickname,
    })
    if (findByNicknameUser && findByNicknameUser.userId != userId) {
      throw new Error(
        "이 닉네임은 현재 사용중입니다. 다른 닉네임을 입력해 주세요."
      )
    }

    const toUpdate = SetUtil.compareValues(updateData, user)
    user = await User.update({ userId, toUpdate })

    return user
  },

  getUserInfo: async ({ userId }) => {
    const user = await User.findById({ userId })

    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      )
    }

    return user
  },

  deleteUser: async ({ userId }) => {
    const isDataDeleted = await User.deleteById({ userId })

    if (!isDataDeleted) {
      throw new Error(
        "해당하는 회원 정보가 없습니다. 다시 한 번 확인해 주세요."
      )
    }

    return { status: "ok" }
  },

  addBookmark: async ({ userId, gameId }) => {
    let user = await User.findById({ userId })
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      )
    }
    // TODO : Game DB 추가하고 실행 가능
    // const game = await User.findByGameId({ gameId }) // 북마크 할 게임 객체 찾기
    // if (!game) {
    //   throw new Error(
    //     "해당 id를 가진 게임 데이터는 없습니다. 다시 한 번 확인해주세요."
    //   )
    // }

    let toUpdate
    const bookmarkList = user.bookmarks // 기존 북마크 목록
    if (bookmarkList.includes(gameId)) {
      // 이미 북마크 한 상태이면
      toUpdate = {
        $pull: {
          bookmarks: gameId,
        },
      }
    } else {
      // 북마크 안 한 상태이면
      toUpdate = {
        $push: {
          bookmarks: gameId,
        },
      }
    }

    user = await User.update({ userId, toUpdate })

    return user
  },

  getBookmarkList: async ({ userId }) => {
    const user = await User.findById({ userId })
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      )
    }
    const bookmarks = user.bookmarks
    // TODO : 북마크에 해당하는 게임 정보들을 gameService 메소드로 가져와서 객체들의 배열로 넘겨줄 것인가

    return bookmarks
  },
}

export { userAuthService }
