import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";

const PointRouter = Router();
PointRouter.use(loginRequired);

export { PointRouter };
