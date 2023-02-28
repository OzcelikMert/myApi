import {Router} from "express";
import {permissionMiddleware, requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import subscriberSchema from "../../schemas/subscriber.schema";
import subscriberController from "../../controllers/subscriber.controller";
import subscriberMiddleware from "../../middlewares/subscriber.middleware";
import PagePaths from "../../constants/pagePaths";

const subscriberRouter = Router();

subscriberRouter.route(`/`)
    .get([requestMiddleware.check(subscriberSchema.getMany), sessionMiddleware.check, permissionMiddleware.check], subscriberController.getMany)
    .post([requestMiddleware.check(subscriberSchema.post), subscriberMiddleware.checkOneWithEmail], subscriberController.add)
    .delete([requestMiddleware.check(subscriberSchema.deleteMany), sessionMiddleware.check, permissionMiddleware.check, subscriberMiddleware.checkMany], subscriberController.deleteMany)

subscriberRouter.route(PagePaths.subscriber(false).withId())
    .get([requestMiddleware.check(subscriberSchema.getOne), sessionMiddleware.check, permissionMiddleware.check], subscriberController.getOne)

subscriberRouter.route(PagePaths.subscriber(false).withEmail())
    .get([requestMiddleware.check(subscriberSchema.getOneWithEmail)], subscriberController.getOneWithEmail)
    .delete([requestMiddleware.check(subscriberSchema.deleteOneWithEmail), subscriberMiddleware.checkOneWithEmail], subscriberController.deleteOneWithEmail)

export default subscriberRouter;