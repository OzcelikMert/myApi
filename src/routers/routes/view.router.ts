import {Router} from "express";
import viewController from "../../controllers/view.controller";
import {requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import viewSchema from "../../schemas/view.schema";
import viewMiddleware from "../../middlewares/view.middleware";

const viewRouter = Router();

viewRouter.route(`/`)
    .post([requestMiddleware.check(viewSchema.post), viewMiddleware.check, viewMiddleware.delete], viewController.set)

viewRouter.route(`/number`)
    .get([sessionMiddleware.check], viewController.getNumber)

viewRouter.route(`/statistics`)
    .get([sessionMiddleware.check], viewController.getStatistics)

export default viewRouter;