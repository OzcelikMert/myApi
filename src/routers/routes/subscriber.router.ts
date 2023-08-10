import {Router} from "express";
import subscriberSchema from "../../schemas/subscriber.schema";
import subscriberController from "../../controllers/subscriber.controller";
import subscriberMiddleware from "../../middlewares/subscriber.middleware";
import PagePaths from "../../constants/pagePaths";
import requestMiddleware from "../../middlewares/validates/request.middleware";
import sessionMiddleware from "../../middlewares/validates/session.middleware";
import permissionMiddleware from "../../middlewares/validates/permission.middleware";

const subscriberRouter = Router();

subscriberRouter.route(PagePaths.subscriber(false).one().self())
    .get([requestMiddleware.check(subscriberSchema.getOne), sessionMiddleware.check, permissionMiddleware.check], subscriberController.getOne)
    .post([requestMiddleware.check(subscriberSchema.post), subscriberMiddleware.checkOne], subscriberController.add)
    .delete([requestMiddleware.check(subscriberSchema.deleteOne), subscriberMiddleware.checkOne], subscriberController.deleteOne)

subscriberRouter.route(PagePaths.subscriber(false).many().self())
    .get([requestMiddleware.check(subscriberSchema.getMany), sessionMiddleware.check, permissionMiddleware.check], subscriberController.getMany)
    .delete([requestMiddleware.check(subscriberSchema.deleteMany), sessionMiddleware.check, permissionMiddleware.check, subscriberMiddleware.checkMany], subscriberController.deleteMany)

export default subscriberRouter;