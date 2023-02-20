import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import componentSchema from "../../schemas/component.schema";
import componentMiddleware from "../../middlewares/component.middleware";
import componentController from "../../controllers/component.controller";
import PagePaths from "../../constants/pagePaths";

const componentRouter = Router();

componentRouter.route(`/`)
    .get([requestMiddleware.check(componentSchema.get)], componentController.get)
    .post([requestMiddleware.check(componentSchema.post), sessionMiddleware.check, permissionMiddleware.check], componentController.add)
    .delete([requestMiddleware.check(componentSchema.delete), sessionMiddleware.check, permissionMiddleware.check], componentController.delete)

componentRouter.route(PagePaths.component(false).rank())
    .put([requestMiddleware.check(componentSchema.putRank), sessionMiddleware.check, permissionMiddleware.check], componentController.updateRank)

componentRouter.route(PagePaths.component(false).withId())
    .get([requestMiddleware.check(componentSchema.get)], componentController.get)
    .put([requestMiddleware.check(componentSchema.put), sessionMiddleware.check, permissionMiddleware.check, componentMiddleware.check], componentController.update)

export default componentRouter;