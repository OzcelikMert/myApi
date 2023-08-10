import {Router} from "express";
import viewController from "../../controllers/view.controller";
import viewSchema from "../../schemas/view.schema";
import viewMiddleware from "../../middlewares/view.middleware";
import PagePaths from "../../constants/pagePaths";
import requestMiddleware from "../../middlewares/validates/request.middleware";
import sessionMiddleware from "../../middlewares/validates/session.middleware";

const viewRouter = Router();

viewRouter.route(PagePaths.view(false).one().self())
    .post([requestMiddleware.check(viewSchema.post), viewMiddleware.checkOne, viewMiddleware.checkAndDeleteMany], viewController.add)

viewRouter.route(PagePaths.view(false).number())
    .get([sessionMiddleware.check], viewController.getNumber)

viewRouter.route(PagePaths.view(false).statistics())
    .get([sessionMiddleware.check], viewController.getStatistics)

export default viewRouter;