import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import postTermSchema from "../../schemas/postTerm.schema";
import postTermMiddleware from "../../middlewares/postTerm.middleware";
import postTermController from "../../controllers/postTerm.controller";

const postTermRouter = Router();

postTermRouter.route(`/:postTypeId/:typeId`)
    .get([requestMiddleware.check(postTermSchema.getWithType), sessionMiddleware.check, postTermMiddleware.check], postTermController.getWithType)
    .post([requestMiddleware.check(postTermSchema.post), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkUrlAlready], postTermController.add)
    .put([requestMiddleware.check(postTermSchema.putStatus), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.check], postTermController.updateStatus)

postTermRouter.route(`/:postTypeId/:typeId/:termId`)
    .get([requestMiddleware.check(postTermSchema.get), sessionMiddleware.check, postTermMiddleware.check], postTermController.get)
    .put([requestMiddleware.check(postTermSchema.put), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkUrlAlready], postTermController.update)
    .delete([requestMiddleware.check(postTermSchema.delete), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.check], postTermController.delete)

export default postTermRouter;