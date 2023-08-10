import { Router } from "express";
import postSchema from "../../schemas/post.schema";
import postController from "../../controllers/post.controller";
import postMiddleware from "../../middlewares/post.middleware";
import viewMiddleware from "../../middlewares/view.middleware";
import PagePaths from "../../constants/pagePaths";
import requestMiddleware from "../../middlewares/validates/request.middleware";
import sessionMiddleware from "../../middlewares/validates/session.middleware";
import permissionMiddleware from "../../middlewares/validates/permission.middleware";

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

postRouter.route(PagePaths.post(false).many().withTypeId().self())
    .delete([requestMiddleware.check(postSchema.deleteMany), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.checkMany], postController.deleteMany)

postRouter.route(PagePaths.post(false).many().withTypeId().status())
    .put([requestMiddleware.check(postSchema.putManyStatus), sessionMiddleware.check, permissionMiddleware.check, postMiddleware.checkMany], postController.updateManyStatus)

postRouter.route(PagePaths.post(false).withTypeId().count())
    .get([requestMiddleware.check(postSchema.getCount)], postController.getCount)

export default postRouter;