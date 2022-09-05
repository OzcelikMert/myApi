import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../../middlewares/validates";
import postSchema from "../../../schemas/post.schema";
import postController from "../../../controllers/post.controller";
import postMiddleware from "../../../middlewares/post.middleware";

const postRouter = Router();

postRouter.route(`/`)
    .get([requestMiddleware.check(postSchema.getGeneral)], postController.getGeneral)

postRouter.route(`/:typeId`)
    .get([requestMiddleware.check(postSchema.getWithType)], postController.getWithType)
    .post([requestMiddleware.check(postSchema.post), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.checkAndSetUrlAlready], postController.add)
    .put([requestMiddleware.check(postSchema.putStatus), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.check], postController.updateStatus)
    .delete([requestMiddleware.check(postSchema.delete), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.check], postController.delete)

postRouter.route(`/:typeId/:postId`)
    .get([requestMiddleware.check(postSchema.get), sessionMiddleware.check, postMiddleware.check], postController.get)
    .put([requestMiddleware.check(postSchema.put), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.checkAndSetUrlAlready], postController.update)

export default postRouter;