import { Router } from "express";
import postTermSchema from "../../schemas/postTerm.schema";
import postTermMiddleware from "../../middlewares/postTerm.middleware";
import postTermController from "../../controllers/postTerm.controller";
import PagePaths from "../../constants/pagePaths";
import requestMiddleware from "../../middlewares/validates/request.middleware";
import sessionMiddleware from "../../middlewares/validates/session.middleware";
import permissionMiddleware from "../../middlewares/validates/permission.middleware";

const postTermRouter = Router();

postTermRouter.route(PagePaths.postTerm(false).one().withPostTypeId().withTypeId().self())
    .get([requestMiddleware.check(postTermSchema.getOne)], postTermController.getOne)
    .post([requestMiddleware.check(postTermSchema.post), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkUrl], postTermController.add)

postTermRouter.route(PagePaths.postTerm(false).one().withPostTypeId().withTypeId().withId().self())
    .put([requestMiddleware.check(postTermSchema.putOne), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkOne, postTermMiddleware.checkUrl], postTermController.updateOne)

postTermRouter.route(PagePaths.postTerm(false).one().withPostTypeId().withTypeId().withId().rank())
    .put([requestMiddleware.check(postTermSchema.putOneRank), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkOne], postTermController.updateOneRank)

postTermRouter.route(PagePaths.postTerm(false).many().withPostTypeId().self())
    .get([requestMiddleware.check(postTermSchema.getMany)], postTermController.getMany)

postTermRouter.route(PagePaths.postTerm(false).many().withPostTypeId().withTypeId().self())
    .delete([requestMiddleware.check(postTermSchema.deleteMany), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkMany], postTermController.deleteMany)

postTermRouter.route(PagePaths.postTerm(false).many().withPostTypeId().withTypeId().status())
    .put([requestMiddleware.check(postTermSchema.putManyStatus), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkMany], postTermController.updateManyStatus)

export default postTermRouter;