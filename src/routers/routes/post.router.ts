import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import postSchema from "../../schemas/post.schema";
import postController from "../../controllers/post.controller";
import postMiddleware from "../../middlewares/post.middleware";
import viewMiddleware from "../../middlewares/view.middleware";
import PagePaths from "../../constants/pagePaths";

const postRouter = Router();

postRouter.route(PagePaths.post(false).one().withTypeId().self())
    .get([requestMiddleware.check(postSchema.getOne)], postController.getOne)
    .post([requestMiddleware.check(postSchema.post), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.checkUrl], postController.add)

postRouter.route(PagePaths.post(false).one().withTypeId().withId().self())
    .put([requestMiddleware.check(postSchema.putOne), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.checkOne, postMiddleware.checkUrl], postController.updateOne)

postRouter.route(PagePaths.post(false).one().withTypeId().withId().view())
    .put([requestMiddleware.check(postSchema.putOneView), viewMiddleware.checkOne, postMiddleware.checkOne], postController.updateOneView)

postRouter.route(PagePaths.post(false).one().withTypeId().withId().rank())
    .put([requestMiddleware.check(postSchema.putOneRank), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.checkOne], postController.updateOneRank)

postRouter.route(PagePaths.post(false).many().self())
    .get([requestMiddleware.check(postSchema.getMany)], postController.getMany)

postRouter.route(PagePaths.post(false).many().count())
    .get([requestMiddleware.check(postSchema.getManyCount)], postController.getManyCount)

postRouter.route(PagePaths.post(false).many().withTypeId().self())
    .delete([requestMiddleware.check(postSchema.deleteMany), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.checkMany], postController.deleteMany)

postRouter.route(PagePaths.post(false).many().withTypeId().status())
    .put([requestMiddleware.check(postSchema.putManyStatus), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.checkMany], postController.updateManyStatus)

export default postRouter;