import { Router } from "express";
import PagePaths from "../../constants/pagePaths";
import navigationSchema from "../../schemas/navigation.schema";
import navigationController from "../../controllers/navigation.controller";
import navigationMiddleware from "../../middlewares/navigation.middleware";
import permissionMiddleware from "../../middlewares/validates/permission.middleware";
import sessionMiddleware from "../../middlewares/validates/session.middleware";
import requestMiddleware from "../../middlewares/validates/request.middleware";

const navigationRouter = Router();

navigationRouter.route(PagePaths.navigation(false).one().self())
    .get([requestMiddleware.check(navigationSchema.getOne)], navigationController.getOne)
    .post([requestMiddleware.check(navigationSchema.post), sessionMiddleware.check, permissionMiddleware.check], navigationController.add)

navigationRouter.route(PagePaths.navigation(false).one().withId().self())
    .put([requestMiddleware.check(navigationSchema.putOne), sessionMiddleware.check, permissionMiddleware.check, navigationMiddleware.checkOne], navigationController.updateOne)

navigationRouter.route(PagePaths.navigation(false).one().withId().rank())
    .put([requestMiddleware.check(navigationSchema.putOneRank), sessionMiddleware.check, permissionMiddleware.check, navigationMiddleware.checkOne], navigationController.updateOneRank)

navigationRouter.route(PagePaths.navigation(false).many().self())
    .get([requestMiddleware.check(navigationSchema.getMany)], navigationController.getMany)
    .delete([requestMiddleware.check(navigationSchema.deleteMany), sessionMiddleware.check, permissionMiddleware.check, navigationMiddleware.checkMany], navigationController.deleteMany)

navigationRouter.route(PagePaths.navigation(false).many().status())
    .put([requestMiddleware.check(navigationSchema.putManyStatus), sessionMiddleware.check, permissionMiddleware.check, navigationMiddleware.checkMany], navigationController.updateManyStatus)

export default navigationRouter;