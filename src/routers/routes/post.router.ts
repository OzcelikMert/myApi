import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import postSchema from "../../schemas/post.schema";
import postController from "../../controllers/post.controller";
import postMiddleware from "../../middlewares/post.middleware";
import viewMiddleware from "../../middlewares/view.middleware";
import PagePaths from "../../constants/pagePaths";

const postRouter = Router();

postRouter.route(`/`)
    .get([requestMiddleware.check(postSchema.getGeneral)], postController.getGeneral)

postRouter.route(PagePaths.post().withTypeId(false).self())
    .get([requestMiddleware.check(postSchema.get)], postController.get)
    .post([requestMiddleware.check(postSchema.post), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.checkAndSetUrlAlready], postController.add)
    .put([requestMiddleware.check(postSchema.putStatus), sessionMiddleware.check, permissionMiddleware.check], postController.updateStatus)
    .delete([requestMiddleware.check(postSchema.delete), sessionMiddleware.check, permissionMiddleware.check], postController.delete)

postRouter.route(PagePaths.post().withTypeId(false).withId(false))
    .get([requestMiddleware.check(postSchema.get)], postController.get)
    .put([requestMiddleware.check(postSchema.put), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.check, postMiddleware.checkAndSetUrlAlready], postController.update)

postRouter.route(PagePaths.post().view(false).withTypeId(false).withId(false))
    .put([requestMiddleware.check(postSchema.putView), viewMiddleware.check, postMiddleware.check], postController.updateView)

export default postRouter;