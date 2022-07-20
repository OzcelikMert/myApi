import {permissionMiddleware, requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import {Router} from "express";
import seoSchema from "../../schemas/seo.schema";
import seoController from "../../controllers/seo.controller";

const seoRouter = Router();

seoRouter.route(`/`)
    .get([requestMiddleware.check(seoSchema.get)], seoController.get)
    .put([requestMiddleware.check(seoSchema.put), sessionMiddleware.check, permissionMiddleware.check], seoController.set)

export default seoRouter;