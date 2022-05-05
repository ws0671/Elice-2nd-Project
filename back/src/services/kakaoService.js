import { User } from "../db";
import axios from "axios";
import jwt from "jsonwebtoken";
import { SetUtil } from "../common/setUtil";

class KakaoService {
  static getToken = async ({ code }) => {
    const baseUrl = "https://kauth.kakao.com/oauth/token";
  };
}

export { KakaoService };
