import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import componentSchema from "../../schemas/component.schema";
import componentMiddleware from "../../middlewares/component.middleware";
import componentController from "../../controllers/component.controller";

const componentRouter = Router();

componentRouter.route(`/`)
    .get([requestMiddleware.check(componentSchema.get)], componentController.get)
    .post([requestMiddleware.check(componentSchema.post), sessionMiddleware.check, permissionMiddleware.check], componentController.add)

componentRouter.route(`/:_id`)
    .get([requestMiddleware.check(componentSchema.get)], componentController.get)
    .put([requestMiddleware.check(componentSchema.put), sessionMiddleware.check, permissionMiddleware.check, componentMiddleware.check], componentController.update)
    .delete([requestMiddleware.check(componentSchema.delete), sessionMiddleware.check, permissionMiddleware.check], componentController.delete)

export default componentRouter;