import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import userController from "../../controllers/user.controller";
import userSchema from "../../schemas/user.schema";
import userMiddleware from "../../middlewares/user.middleware";
import PagePaths from "../../constants/pagePaths";

const userRouter = Router();

userRouter.route(`/`)
    .get([sessionMiddleware.check], userController.get)
    .post([requestMiddleware.check(userSchema.post), sessionMiddleware.check, permissionMiddleware.check, userMiddleware.checkRoleRank, userMiddleware.checkAlreadyEmail, userMiddleware.checkAndSetUrlAlready], userController.add)

userRouter.route(PagePaths.user().withId(false))
    .get([sessionMiddleware.check], userController.get)
    .put([requestMiddleware.check(userSchema.put), sessionMiddleware.check, permissionMiddleware.check, userMiddleware.check, userMiddleware.checkRoleRank, userMiddleware.checkAlreadyEmail, userMiddleware.checkAndSetUrlAlready], userController.update)
    .delete([requestMiddleware.check(userSchema.delete), sessionMiddleware.check, permissionMiddleware.check, userMiddleware.check, userMiddleware.checkRoleRank], userController.delete)

userRouter.route(PagePaths.user().profile(false))
    .put([requestMiddleware.check(userSchema.putProfile), sessionMiddleware.check, userMiddleware.setIsProfile, userMiddleware.checkAndSetUrlAlready], userController.updateProfile)

userRouter.route(PagePaths.user().changePassword(false))
    .put([requestMiddleware.check(userSchema.putPassword), sessionMiddleware.check, userMiddleware.checkPassword], userController.updatePassword)

export default userRouter;