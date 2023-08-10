import { Router } from "express";
import componentSchema from "../../schemas/component.schema";
import componentMiddleware from "../../middlewares/component.middleware";
import componentController from "../../controllers/component.controller";
import PagePaths from "../../constants/pagePaths";
import requestMiddleware from "../../middlewares/validates/request.middleware";
import sessionMiddleware from "../../middlewares/validates/session.middleware";
import permissionMiddleware from "../../middlewares/validates/permission.middleware";

const componentRouter = Router();

componentRouter.route(PagePaths.component(false).one().self())
    .post([requestMiddleware.check(componentSchema.post), sessionMiddleware.check, permissionMiddleware.check], componentController.add)
    .get([requestMiddleware.check(componentSchema.getOne)], componentController.getOne)

componentRouter.route(PagePaths.component(false).one().withId().self())
    .put([requestMiddleware.check(componentSchema.putOne), sessionMiddleware.check, permissionMiddleware.check, componentMiddleware.checkOne], componentController.updateOne)

componentRouter.route(PagePaths.component(false).many().self())
    .get([requestMiddleware.check(componentSchema.getMany)], componentController.getMany)
    .delete([requestMiddleware.check(componentSchema.deleteMany), sessionMiddleware.check, permissionMiddleware.check, componentMiddleware.checkMany], componentController.deleteMany)

export default componentRouter;