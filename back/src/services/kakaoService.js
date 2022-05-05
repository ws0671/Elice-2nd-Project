import { User } from "../db";
import axios from "axios";
import jwt from "jsonwebtoken";
import { SetUtil } from "../common/setUtil";

class KakaoService {
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
