import { User } from "../db";
import axios from "axios";
import jwt from "jsonwebtoken";

class GoogleService {
  static base64urlDecode = (str) => {
    return Buffer.from(this.base64urlUnescape(str), "base64").toString();
  };

  static base64urlUnescape = (str) => {
    str += Array(5 - (str.length % 4)).join("=");
    return str.replace(/\-/g, "+").replace(/_/g, "/");
  };

  static getToken = async () => {
    const uri = "https://oauth2.googleapis.com/token";
    const config = {
      code,
      client_id: process.env.GOOGLE_CLIENT,
      client_secret: process.env.GOOGLE_SECRET,
      redirect_uri: "http://localhost:3000/auth/google/callback",
    };
    const params = new URLSearchParams(config);

    const finalUrl = `${uri}?${params}&grant_type=authorization_code`;

    const tokenRequest = await axios.post(finalUrl, config);
    const idToken = tokenRequest.data.id_token.split(".");
    const payload = JSON.parse(this.base64urlDecode(idToken[1]));
    return this.getUserData(payload);
  };
}

export { GoogleService };
