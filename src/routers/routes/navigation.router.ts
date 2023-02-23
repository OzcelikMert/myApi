import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import PagePaths from "../../constants/pagePaths";
import navigationSchema from "../../schemas/navigation.schema";
import navigationController from "../../controllers/navigation.controller";
import navigationMiddleware from "../../middlewares/navigation.middleware";

const navigationRouter = Router();

navigationRouter.route(`/`)
    .get([requestMiddleware.check(navigationSchema.getMany)], navigationController.getMany)
    .post([requestMiddleware.check(navigationSchema.post), sessionMiddleware.check, permissionMiddleware.check], navigationController.add)
    .delete([requestMiddleware.check(navigationSchema.deleteMany), sessionMiddleware.check, permissionMiddleware.check, navigationMiddleware.checkMany], navigationController.deleteMany)

navigationRouter.route(PagePaths.navigation(false).status())
    .put([requestMiddleware.check(navigationSchema.putManyStatus), sessionMiddleware.check, permissionMiddleware.check, navigationMiddleware.checkMany], navigationController.updateManyStatus)

navigationRouter.route(PagePaths.navigation(false).withId().self())
    .get([requestMiddleware.check(navigationSchema.getOne)], navigationController.getOne)
    .put([requestMiddleware.check(navigationSchema.putOne), sessionMiddleware.check, permissionMiddleware.check, navigationMiddleware.checkOne], navigationController.updateOne)

navigationRouter.route(PagePaths.navigation(false).withId().rank())
    .put([requestMiddleware.check(navigationSchema.putOneRank), sessionMiddleware.check, permissionMiddleware.check, navigationMiddleware.checkOne], navigationController.updateOneRank)

export default navigationRouter;