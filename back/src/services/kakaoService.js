import { User } from "../db";
import axios from "axios";
import jwt from "jsonwebtoken";
import { SetUtil } from "../common/setUtil";

class KakaoService {
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
    }
  };

  static getUserData = async ({ accessToken }) => {
    const apiUrl = "https://kapi.kakao.com/v2/user/me";
    const userData = await axios.get(`${apiUrl}`, {
      Headers: { Authorization: `Bearer ${accessToken}` },
    });

    const userId = userData.data.id;
    const { nickname } = userData.data.properties;
    const { email } = userData.data.kakao_account;

    return this.checkUser({ email, nickname, userId, loginMethod: "Kakao" });
  };

  static getToken = async ({ code }) => {
    const baseUrl = "https://kauth.kakao.com/oauth/token";
    const body = {
      client_id: process.env.KAKAO_CLIENT,
      redirect_uri: "http://localhost:3000/auth/kakao/callback",
      grant_type: "authorization_code",
      code,
    };
    const params = new URLSearchParams(body);
    const finalUrl = `${baseUrl}?${params}`;

    const tokenRequest = await axios.post(finalUrl, body);

    const accessToken = tokenRequest.data.access_token;
    return this.getUserData({ accessToken });
  };
}

export { KakaoService };
