import { User } from "../db";
import axios from "axios";
import jwt from "jsonwebtoken";

class GithubService {
  static addUser = async ({ newUser }) => {
    const user = await User.create({ newUser });
    return user;
  };

  static checkUser = async ({ email, nickname, id, loginMethod }) => {
    const user = await User.findByEmail({ email });
    if (user) {
      if (user.userId == id) {
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ user_id: user.userId }, secretKey);
        const loginUser = { token, userId: id, email, nickname };
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
        userId: id,
        loginMethod,
        password: "noPassword!",
      };
      const createdNewUser = await this.addUser({ newUser });
      return createdNewUser;
    }
  };

  static getUserData = async ({ access_token }) => {
    const apiUrl = "https://api.github.com";
    const { data: userdata } = await axios.get(`${apiUrl}/user`, {
      headers: { Authorization: `token ${access_token}` },
    });

    const { data: emailDataArr } = await axios.get(`${apiUrl}/user/emails`, {
      headers: { Authorization: `token ${access_token}` },
    });

    const { email } = emailDataArr.find(
      (emailObj) => emailObj.primary === true && emailObj.verified === true
    );

    const { login: nickname, id } = userdata;
    console.log(nickname, id);
    return this.checkUser({ email, nickname, id, loginMethod: "Github" });
  };

  static getToken = async ({ code }) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const body = {
      client_id: process.env.GITHUB_CLIENT,
      client_secret: process.env.GITHUB_SECRET,
      code,
    };
    const finalUrl = baseUrl;

    const { data: requestToken } = await axios.post(finalUrl, body, {
      headers: { Accept: "application/json" },
    });
    const { access_token } = requestToken;
    return this.getUserData({ access_token });
  };
}

export { GithubService };
