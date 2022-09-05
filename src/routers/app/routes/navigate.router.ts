import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../../middlewares/validates";
import navigateSchema from "../../../schemas/navigate.schema";
import navigateController from "../../../controllers/navigate.controller";
import navigateMiddleware from "../../../middlewares/navigate.middleware";

const navigateRouter = Router();

navigateRouter.route(`/`)
    .get([requestMiddleware.check(navigateSchema.get)], navigateController.get)
    .post([requestMiddleware.check(navigateSchema.post), sessionMiddleware.check, permissionMiddleware.check], navigateController.add)
    .put([requestMiddleware.check(navigateSchema.putStatus), sessionMiddleware.check, permissionMiddleware.check, navigateMiddleware.check], navigateController.updateStatus)
    .delete([requestMiddleware.check(navigateSchema.delete), sessionMiddleware.check, permissionMiddleware.check, navigateMiddleware.check], navigateController.delete)

navigateRouter.route(`/:navigateId`)
    .get([requestMiddleware.check(navigateSchema.get)], navigateController.get)
    .put([requestMiddleware.check(navigateSchema.put), sessionMiddleware.check, permissionMiddleware.check, navigateMiddleware.check], navigateController.update)

export default navigateRouter;