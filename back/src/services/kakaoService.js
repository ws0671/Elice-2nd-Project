import { User } from "../db";
import axios from "axios";
import jwt from "jsonwebtoken";
import { SetUtil } from "../common/SetUtil";

class KakaoService {
  static addUser = async ({ newUser }) => {
    const user = await User.findByNickname({ nickname: newUser.nickname });

    if (user) {
      const randomCode = SetUtil.randomCode();
      newUser.nickname = `KAKAO_USER${randomCode}`;
    }

    const createdNewUser = await User.create({ newUser });
    return createdNewUser;
  };

  static checkUser = async ({ email, nickname, userId, loginMethod }) => {
    const user = await User.findByEmail({ email });
    if (user) {
      if (user.userId == userId) {
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ user_id: user.userId }, secretKey);
        const loginUser = {
          token,
          userId,
          email,
          nickname: user.nickname,
          bookmarks: user.bookmarks,
        };
        return loginUser;
      } else if (user.loginMethod !== loginMethod) {
        throw new Error(
          `${user.loginMethod}로 가입한 이력이 있습니다. ${user.loginMethod}로 로그인해주세요.`
        );
      }
    } else {
      const newUser = {
        email,
        nickname,
        userId,
        loginMethod,
        password: "noPassword!",
      };
      const createdNewUser = await this.addUser({ newUser });

      const registerUser = { ...createdNewUser, register: true };
      return registerUser;
    }
  };

  static getUserData = async ({ accessToken }) => {
    console.log("access token이 잘 넘어왔니? :", accessToken);
    const apiUrl = "https://kapi.kakao.com/v2/user/me";
    const userData = await axios.get(`${apiUrl}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("너만 되면 다 된 거야!!!! :", userData);
    const userId = userData.data.id;
    const { nickname } = userData.data.properties;
    const { email } = userData.data.kakao_account;

    return this.checkUser({ email, nickname, userId, loginMethod: "Kakao" });
  };

  static getToken = async ({ code }) => {
    console.log("서비스로 코드가 넘어왔니? :", code);
    const baseUrl = "https://kauth.kakao.com/oauth/token";
    const config = {
      client_id: process.env.KAKAO_CLIENT,
      redirect_uri:
        "http://elice-kdt-ai-4th-team06.elicecoding.com/auth/kakao/callback",
      grant_type: "authorization_code",
      code,
    };
    const params = new URLSearchParams(config);
    const finalUrl = `${baseUrl}?${params}`;

    const tokenRequest = await axios.post(finalUrl, config);
    console.log("tokenRequest 결과 :", tokenRequest);

    const accessToken = tokenRequest.data.access_token;
    return this.getUserData({ accessToken });
  };
}

export { KakaoService };
