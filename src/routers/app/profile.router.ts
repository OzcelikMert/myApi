import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import profileSchema from "../../schemas/profile.schema";
import profileController from "../../controllers/profile.controller";
import profileMiddleware from "../../middlewares/profile.middleware";
import userMiddleware from "../../middlewares/user.middleware";

const profileRouter = Router();

profileRouter.route(`/`)
    .put([requestMiddleware.check(profileSchema.put), sessionMiddleware.check, profileMiddleware.setIsProfile, userMiddleware.checkAndSetUrlAlready], profileController.update)

profileRouter.route(`/changePassword`)
    .put([requestMiddleware.check(profileSchema.putPassword), sessionMiddleware.check, profileMiddleware.checkPassword], profileController.updatePassword)



export default profileRouter;