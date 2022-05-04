import axios from "axios";
import { Router } from "express";
import { User } from "../db";

const AuthRouter = Router();

AuthRouter.get("/github/callback", async (req, res, next) => {
  try {
    const code = req.query.code;
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

    let user = await User.findByEmail({ email });
    if (!user) {
      const newUser = { email, nickname, userId: id, password: "noPassword" };
      await User.create({ newUser });
    } else {
      throw new Error("이미 가입된 이메일입니다");
    }

    res.status(201).redirect("/");
  } catch (error) {
    next(error);
  }
});

export { AuthRouter };
