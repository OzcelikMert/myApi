import {requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import authSchema from "../../schemas/auth.schema";
import authController from "../../controllers/auth.controller";
import {Router} from "express";

const authRouter = Router();

authRouter.route(`/`)
    .get([requestMiddleware.check(authSchema.get), sessionMiddleware.check], authController.getSession)
    .post([requestMiddleware.check(authSchema.post)], authController.login)
    .delete([sessionMiddleware.check], authController.logOut)

export default authRouter;