import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { ReviewService } from "../services/reviewService";

const ReviewRouter = Router();
ReviewRouter.use(loginRequired);

export { ReviewRouter };
