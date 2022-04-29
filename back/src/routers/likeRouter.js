import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { LikeService } from "../services/reviewService";

const LikeRouter = Router();
LikeRouter.use(loginRequired);

export { LikeRouter };
