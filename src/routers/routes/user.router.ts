import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import userController from "../../controllers/user.controller";
import userSchema from "../../schemas/user.schema";
import userMiddleware from "../../middlewares/user.middleware";
import PagePaths from "../../constants/pagePaths";

const userRouter = Router();

userRouter.route(PagePaths.user(false).one().self())
    .get([requestMiddleware.check(userSchema.getOne), sessionMiddleware.check], userController.getOne)
    .post([requestMiddleware.check(userSchema.post), sessionMiddleware.check, permissionMiddleware.check, userMiddleware.checkOneRoleRank, userMiddleware.checkAlreadyEmail, userMiddleware.checkUrl], userController.add)

userRouter.route(PagePaths.user(false).one().withId())
    .put([requestMiddleware.check(userSchema.putOne), sessionMiddleware.check, permissionMiddleware.check, userMiddleware.checkOne, userMiddleware.checkOneRoleRank, userMiddleware.checkAlreadyEmail, userMiddleware.checkUrl], userController.updateOne)
    .delete([requestMiddleware.check(userSchema.deleteOne), sessionMiddleware.check, permissionMiddleware.check, userMiddleware.checkOne, userMiddleware.checkOneRoleRank], userController.deleteOne)

userRouter.route(PagePaths.user(false).many().self())
    .get([sessionMiddleware.check], userController.getMany)

userRouter.route(PagePaths.user(false).profile())
    .put([requestMiddleware.check(userSchema.putProfile), sessionMiddleware.check, userMiddleware.setIsProfile, userMiddleware.checkUrl], userController.updateProfile)

userRouter.route(PagePaths.user(false).changePassword())
    .put([requestMiddleware.check(userSchema.putPassword), sessionMiddleware.check, userMiddleware.checkPasswordWithSessionEmail], userController.updatePassword)

export default userRouter;