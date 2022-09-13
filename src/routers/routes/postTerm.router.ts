import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import postTermSchema from "../../schemas/postTerm.schema";
import postTermMiddleware from "../../middlewares/postTerm.middleware";
import postTermController from "../../controllers/postTerm.controller";

const postTermRouter = Router();

postTermRouter.route(`/:postTypeId`)
    .get([requestMiddleware.check(postTermSchema.get)], postTermController.get)

postTermRouter.route(`/:postTypeId/:typeId`)
    .get([requestMiddleware.check(postTermSchema.get)], postTermController.get)
    .post([requestMiddleware.check(postTermSchema.post), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkAndSetUrlAlready], postTermController.add)
    .put([requestMiddleware.check(postTermSchema.putStatus), sessionMiddleware.check, permissionMiddleware.check], postTermController.updateStatus)
    .delete([requestMiddleware.check(postTermSchema.delete), sessionMiddleware.check, permissionMiddleware.check], postTermController.delete)

postTermRouter.route(`/:postTypeId/:typeId/:termId`)
    .get([requestMiddleware.check(postTermSchema.get)], postTermController.get)
    .put([requestMiddleware.check(postTermSchema.put), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.check, postTermMiddleware.checkAndSetUrlAlready], postTermController.update)

export default postTermRouter;