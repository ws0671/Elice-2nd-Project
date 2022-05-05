import { User } from "../db";
import axios from "axios";
import jwt from "jsonwebtoken";
import { SetUtil } from "../common/setUtil";

class KakaoService {
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
