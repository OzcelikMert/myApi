import { Router } from "express";
import {sessionMiddleware, permissionMiddleware, requestMiddleware} from "../../middlewares/validates";
import postTermSchema from "../../schemas/postTerm.schema";
import postTermMiddleware from "../../middlewares/postTerm.middleware";
import postTermController from "../../controllers/postTerm.controller";
import PagePaths from "../../constants/pagePaths";

const postTermRouter = Router();

postTermRouter.route(PagePaths.postTerm(false).withPostTypeId().self())
    .get([requestMiddleware.check(postTermSchema.getMany)], postTermController.getMany)

postTermRouter.route(PagePaths.postTerm(false).withPostTypeId().withTypeId().self())
    .post([requestMiddleware.check(postTermSchema.post), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkUrl], postTermController.add)
    .delete([requestMiddleware.check(postTermSchema.deleteMany), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkMany], postTermController.deleteMany)

postTermRouter.route(PagePaths.postTerm(false).withPostTypeId().withTypeId().status())
    .put([requestMiddleware.check(postTermSchema.putManyStatus), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkMany], postTermController.updateManyStatus)

postTermRouter.route(PagePaths.postTerm(false).withPostTypeId().withTypeId().withId().self())
    .get([requestMiddleware.check(postTermSchema.getOne)], postTermController.getOne)
    .put([requestMiddleware.check(postTermSchema.putOne), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkOne, postTermMiddleware.checkUrl], postTermController.updateOne)

postTermRouter.route(PagePaths.postTerm(false).withPostTypeId().withTypeId().withId().rank())
    .put([requestMiddleware.check(postTermSchema.putOneRank), sessionMiddleware.check, permissionMiddleware.check, postTermMiddleware.checkOne], postTermController.updateOneRank)

export default postTermRouter;