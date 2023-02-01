import {permissionMiddleware, requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import {Router} from "express";
import languageSchema from "../../schemas/language.schema";
import languageController from "../../controllers/language.controller";
import PagePaths from "../../constants/pagePaths";

const languageRouter = Router();

languageRouter.route(`/`)
    .get([requestMiddleware.check(languageSchema.get)], languageController.get)
    .post([requestMiddleware.check(languageSchema.post), sessionMiddleware.check, permissionMiddleware.check], languageController.add)

languageRouter.route(PagePaths.language(false).flags())
    .get([requestMiddleware.check(languageSchema.get), sessionMiddleware.check, permissionMiddleware.check], languageController.getFlags)

languageRouter.route(PagePaths.language(false).withId())
    .get([requestMiddleware.check(languageSchema.get)], languageController.get)
    .put([requestMiddleware.check(languageSchema.put), sessionMiddleware.check, permissionMiddleware.check], languageController.update)

export default languageRouter;