import {Router} from "express";
import languageSchema from "../../schemas/language.schema";
import languageController from "../../controllers/language.controller";
import PagePaths from "../../constants/pagePaths";
import languageMiddleware from "../../middlewares/language.middleware";
import requestMiddleware from "../../middlewares/validates/request.middleware";
import sessionMiddleware from "../../middlewares/validates/session.middleware";
import permissionMiddleware from "../../middlewares/validates/permission.middleware";

const languageRouter = Router();

languageRouter.route(PagePaths.language(false).one().self())
    .get([requestMiddleware.check(languageSchema.getOne)], languageController.getOne)
    .post([requestMiddleware.check(languageSchema.post), sessionMiddleware.check, permissionMiddleware.check], languageController.add)

languageRouter.route(PagePaths.language(false).one().withId().self())
    .put([requestMiddleware.check(languageSchema.putOne), sessionMiddleware.check, permissionMiddleware.check, languageMiddleware.checkOne], languageController.updateOne)

languageRouter.route(PagePaths.language(false).one().withId().rank())
    .put([requestMiddleware.check(languageSchema.putOneRank), sessionMiddleware.check, permissionMiddleware.check, languageMiddleware.checkOne], languageController.updateOneRank)

languageRouter.route(PagePaths.language(false).many().self())
    .get([requestMiddleware.check(languageSchema.getMany)], languageController.getMany)

languageRouter.route(PagePaths.language(false).flags())
    .get([sessionMiddleware.check, permissionMiddleware.check], languageController.getFlags)

export default languageRouter;