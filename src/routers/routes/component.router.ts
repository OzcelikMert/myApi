import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import componentSchema from "../../schemas/component.schema";
import componentMiddleware from "../../middlewares/component.middleware";
import componentController from "../../controllers/component.controller";
import PagePaths from "../../constants/pagePaths";

const componentRouter = Router();

componentRouter.route(`/`)
    .get([requestMiddleware.check(componentSchema.getMany)], componentController.getMany)
    .post([requestMiddleware.check(componentSchema.post), sessionMiddleware.check, permissionMiddleware.check], componentController.add)
    .delete([requestMiddleware.check(componentSchema.deleteMany), sessionMiddleware.check, permissionMiddleware.check, componentMiddleware.checkMany], componentController.deleteMany)

componentRouter.route(PagePaths.component(false).withId().self())
    .get([requestMiddleware.check(componentSchema.getOne)], componentController.getOne)
    .put([requestMiddleware.check(componentSchema.putOne), sessionMiddleware.check, permissionMiddleware.check, componentMiddleware.checkOne], componentController.updateOne)

export default componentRouter;