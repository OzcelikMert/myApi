import {permissionMiddleware, requestMiddleware, sessionMiddleware} from "../../../middlewares/validates";
import {Router} from "express";
import settingSchema from "../../../schemas/setting.schema";
import settingController from "../../../controllers/setting.controller";
import settingMiddleware from "../../../middlewares/setting.middleware";

const settingRouter = Router();

settingRouter.route(`/`)
    .get([requestMiddleware.check(settingSchema.get)], settingController.get)
    .put([requestMiddleware.check(settingSchema.put), sessionMiddleware.check, permissionMiddleware.check, settingMiddleware.check], settingController.set)

export default settingRouter;