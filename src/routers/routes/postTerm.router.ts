import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import postTermSchema from "../../schemas/postTerm.schema";
import postTermMiddleware from "../../middlewares/postTerm.middleware";
import postTermController from "../../controllers/postTerm.controller";
import PagePaths from "../../constants/pagePaths";

const postTermRouter = Router();

postTermRouter.route(PagePaths.postTerm(false).withPostTypeId().self())
    .get([requestMiddleware.check(postTermSchema.get)], postTermController.get)

postTermRouter.route(PagePaths.postTerm(false).withPostTypeId().withTypeId().self())
    .get([requestMiddleware.check(postTermSchema.get)], postTermController.get)
    .post([requestMiddleware.check(postTermSchema.post), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkAndSetUrlAlready], postTermController.add)
    .put([requestMiddleware.check(postTermSchema.putStatus), sessionMiddleware.check, permissionMiddleware.check], postTermController.updateStatus)
    .delete([requestMiddleware.check(postTermSchema.delete), sessionMiddleware.check, permissionMiddleware.check], postTermController.delete)

postTermRouter.route(PagePaths.postTerm(false).withPostTypeId().withTypeId().withId())
    .get([requestMiddleware.check(postTermSchema.get)], postTermController.get)
    .put([requestMiddleware.check(postTermSchema.put), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.check, postTermMiddleware.checkAndSetUrlAlready], postTermController.update)

export default postTermRouter;