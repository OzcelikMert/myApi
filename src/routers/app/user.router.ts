import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import userController from "../../controllers/user.controller";
import userSchema from "../../schemas/user.schema";
import userMiddleware from "../../middlewares/user.middleware";

const userRouter = Router();

userRouter.route(`/`)
    .get([sessionMiddleware.check], userController.get)
    .post([requestMiddleware.check(userSchema.post), sessionMiddleware.check, permissionMiddleware.check, userMiddleware.checkRoleRank, userMiddleware.checkAlreadyEmail], userController.add)

userRouter.route(`/:userId`)
    .get([sessionMiddleware.check], userController.get)
    .put([requestMiddleware.check(userSchema.put), sessionMiddleware.check, permissionMiddleware.check, userMiddleware.check, userMiddleware.checkRoleRank, userMiddleware.checkAlreadyEmail], userController.update)
    .delete([requestMiddleware.check(userSchema.delete), sessionMiddleware.check, permissionMiddleware.check, userMiddleware.check, userMiddleware.checkRoleRank], userController.delete)



export default userRouter;