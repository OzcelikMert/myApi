import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import PagePaths from "../../constants/pagePaths";
import navigationSchema from "../../schemas/navigation.schema";
import navigationController from "../../controllers/navigation.controller";

const navigationRouter = Router();

navigationRouter.route(`/`)
    .get([requestMiddleware.check(navigationSchema.get)], navigationController.get)
    .post([requestMiddleware.check(navigationSchema.post), sessionMiddleware.check, permissionMiddleware.check], navigationController.add)
    .delete([requestMiddleware.check(navigationSchema.delete), sessionMiddleware.check, permissionMiddleware.check], navigationController.delete)

navigationRouter.route(PagePaths.navigation(false).status())
    .put([requestMiddleware.check(navigationSchema.putStatus), sessionMiddleware.check, permissionMiddleware.check], navigationController.updateStatus)

navigationRouter.route(PagePaths.navigation(false).rank())
    .put([requestMiddleware.check(navigationSchema.putRank), sessionMiddleware.check, permissionMiddleware.check], navigationController.updateRank)

navigationRouter.route(PagePaths.navigation(false).withId())
    .get([requestMiddleware.check(navigationSchema.get)], navigationController.get)
    .put([requestMiddleware.check(navigationSchema.put), sessionMiddleware.check, permissionMiddleware.check], navigationController.update)

export default navigationRouter;