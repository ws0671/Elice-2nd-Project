import { User } from "../db";
import axios from "axios";
import jwt from "jsonwebtoken";

class GoogleService {
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
  };
}

export { GoogleService };
