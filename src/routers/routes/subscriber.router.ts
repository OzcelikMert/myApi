import {Router} from "express";
import {permissionMiddleware, requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import subscriberSchema from "../../schemas/subscriber.schema";
import subscriberController from "../../controllers/subscriber.controller";
import subscriberMiddleware from "../../middlewares/subscriber.middleware";

const subscriberRouter = Router();

subscriberRouter.route(`/`)
    .get([requestMiddleware.check(subscriberSchema.get), sessionMiddleware.check, permissionMiddleware.check], subscriberController.get)
    .post([requestMiddleware.check(subscriberSchema.post), subscriberMiddleware.isThere], subscriberController.add)
    .delete([requestMiddleware.check(subscriberSchema.delete), sessionMiddleware.check, permissionMiddleware.check], subscriberController.delete)

subscriberRouter.route(`/:email`)
    .delete([requestMiddleware.check(subscriberSchema.deleteWithEmail)], subscriberController.deleteWithEmail)

export default subscriberRouter;