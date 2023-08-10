import {Router} from "express";
import settingSchema from "../../schemas/setting.schema";
import settingController from "../../controllers/setting.controller";
import PagePaths from "../../constants/pagePaths";
import requestMiddleware from "../../middlewares/validates/request.middleware";
import sessionMiddleware from "../../middlewares/validates/session.middleware";
import permissionMiddleware from "../../middlewares/validates/permission.middleware";

const settingRouter = Router();

settingRouter.route(`/`)
    .get([requestMiddleware.check(settingSchema.get)], settingController.get)

settingRouter.route(PagePaths.setting(false).seo())
    .put([requestMiddleware.check(settingSchema.putSeo), sessionMiddleware.check, permissionMiddleware.check], settingController.setSeo)

settingRouter.route(PagePaths.setting(false).general())
    .put([requestMiddleware.check(settingSchema.putGeneral), sessionMiddleware.check, permissionMiddleware.check], settingController.setGeneral)

settingRouter.route(PagePaths.setting(false).contactForm())
    .put([requestMiddleware.check(settingSchema.putContactForm), sessionMiddleware.check, permissionMiddleware.check], settingController.setContactForm)

settingRouter.route(PagePaths.setting(false).staticLanguage())
    .put([requestMiddleware.check(settingSchema.putStaticLanguage), sessionMiddleware.check, permissionMiddleware.check], settingController.setStaticLanguage)

settingRouter.route(PagePaths.setting(false).socialMedia())
    .put([requestMiddleware.check(settingSchema.putSocialMedia), sessionMiddleware.check, permissionMiddleware.check], settingController.setSocialMedia)

settingRouter.route(PagePaths.setting(false).eCommerce())
    .put([requestMiddleware.check(settingSchema.putECommerce), sessionMiddleware.check, permissionMiddleware.check], settingController.setECommerce)

export default settingRouter;