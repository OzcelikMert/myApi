import {Router} from "express";
import viewController from "../../controllers/view.controller";
import {requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import viewSchema from "../../schemas/view.schema";
import viewMiddleware from "../../middlewares/view.middleware";
import PagePaths from "../../constants/pagePaths";

const viewRouter = Router();

viewRouter.route(`/`)
    .post([requestMiddleware.check(viewSchema.post), viewMiddleware.checkOne],  viewController.deleteMany, viewController.add)

viewRouter.route(PagePaths.view(false).number())
    .get([sessionMiddleware.check], viewController.getNumber)

viewRouter.route(PagePaths.view(false).statistics())
    .get([sessionMiddleware.check], viewController.getStatistics)

export default viewRouter;