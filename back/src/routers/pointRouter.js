import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { pointService } from "../services/pointService";

const PointRouter = Router();
PointRouter.use(loginRequired);

export { PointRouter };
