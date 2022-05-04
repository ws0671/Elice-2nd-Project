import { Router } from "express";
import { GithubService } from "../services/githubService";

const AuthRouter = Router();

AuthRouter.get("/github", async (req, res, next) => {
  try {
    const code = req.query.code;
  } catch (error) {
    next(error);
  }
});

export { AuthRouter };
