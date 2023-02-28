import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import userController from "../../controllers/user.controller";
import userSchema from "../../schemas/user.schema";
import userMiddleware from "../../middlewares/user.middleware";
import PagePaths from "../../constants/pagePaths";

const userRouter = Router();

userRouter.route(`/`)
    .get([sessionMiddleware.check], userController.getMany)
    .post([requestMiddleware.check(userSchema.post), sessionMiddleware.check, permissionMiddleware.check, userMiddleware.checkOneRoleRank, userMiddleware.checkAlreadyEmail, userMiddleware.checkUrl], userController.add)

userRouter.route(PagePaths.user(false).withUrl())
    .put([requestMiddleware.check(userSchema.getOneWithUrl)], userController.getOneWithUrl)

userRouter.route(PagePaths.user(false).login())
    .get([requestMiddleware.check(userSchema.getOneLogin)], userController.getOneLogin)

userRouter.route(PagePaths.user(false).profile())
    .put([requestMiddleware.check(userSchema.putProfile), sessionMiddleware.check, userMiddleware.setIsProfile, userMiddleware.checkUrl], userController.updateProfile)

userRouter.route(PagePaths.user(false).changePassword())
    .put([requestMiddleware.check(userSchema.putPassword), sessionMiddleware.check, userMiddleware.checkPasswordWithSessionEmail], userController.updatePassword)

userRouter.route(PagePaths.user(false).withId())
    .get([sessionMiddleware.check], userController.getOne)
    .put([requestMiddleware.check(userSchema.putOne), sessionMiddleware.check, permissionMiddleware.check, userMiddleware.checkOne, userMiddleware.checkOneRoleRank, userMiddleware.checkAlreadyEmail, userMiddleware.checkUrl], userController.updateOne)
    .delete([requestMiddleware.check(userSchema.deleteOne), sessionMiddleware.check, permissionMiddleware.check, userMiddleware.checkOne, userMiddleware.checkOneRoleRank], userController.deleteOne)

export default userRouter;