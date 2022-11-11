import {permissionMiddleware, requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import {Router} from "express";
import settingSchema from "../../schemas/setting.schema";
import settingController from "../../controllers/setting.controller";
import settingMiddleware from "../../middlewares/setting.middleware";
import PagePaths from "../../constants/pagePaths";

const settingRouter = Router();

settingRouter.route(`/`)
    .get([requestMiddleware.check(settingSchema.get)], settingController.get)

settingRouter.route(PagePaths.setting().seo(false))
    .put([requestMiddleware.check(settingSchema.putSeo), sessionMiddleware.check, permissionMiddleware.check], settingController.setSeo)

settingRouter.route(PagePaths.setting().general(false))
    .put([requestMiddleware.check(settingSchema.putGeneral), sessionMiddleware.check, permissionMiddleware.check], settingController.setGeneral)

settingRouter.route(PagePaths.setting().contactForm(false))
    .put([requestMiddleware.check(settingSchema.putContactForm), sessionMiddleware.check, permissionMiddleware.check], settingController.setContactForm)

settingRouter.route(PagePaths.setting().staticLanguage(false))
    .put([requestMiddleware.check(settingSchema.putStaticLanguage), sessionMiddleware.check, permissionMiddleware.check], settingController.setStaticLanguage)

export default settingRouter;