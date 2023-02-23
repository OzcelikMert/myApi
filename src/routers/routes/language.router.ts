import {permissionMiddleware, requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import {Router} from "express";
import languageSchema from "../../schemas/language.schema";
import languageController from "../../controllers/language.controller";
import PagePaths from "../../constants/pagePaths";
import languageMiddleware from "../../middlewares/language.middleware";

const languageRouter = Router();

languageRouter.route(`/`)
    .get([requestMiddleware.check(languageSchema.getMany)], languageController.getMany)
    .post([requestMiddleware.check(languageSchema.post), sessionMiddleware.check, permissionMiddleware.check], languageController.add)

languageRouter.route(PagePaths.language(false).flags())
    .get([sessionMiddleware.check, permissionMiddleware.check], languageController.getFlags)

languageRouter.route(PagePaths.language(false).withId().self())
    .get([requestMiddleware.check(languageSchema.getOne)], languageController.getOne)
    .put([requestMiddleware.check(languageSchema.putOne), sessionMiddleware.check, permissionMiddleware.check, languageMiddleware.checkOne], languageController.updateOne)

languageRouter.route(PagePaths.language(false).withId().rank())
    .put([requestMiddleware.check(languageSchema.putOneRank), sessionMiddleware.check, permissionMiddleware.check, languageMiddleware.checkOne], languageController.updateOneRank)

export default languageRouter;