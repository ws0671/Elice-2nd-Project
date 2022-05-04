import { Router } from "express";

const AuthRouter = Router();

AuthRouter.get("/github", async (req, res, next) => {
  try {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
      client_id: process.env.GITHUB_CLIENT,
      scope: "read:user user:email",
      allow_signup: true,
    };
    const parmas = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${parmas}`;

    res.redirect(finalUrl);
  } catch (error) {
    next(error);
  }
});

export { AuthRouter };
