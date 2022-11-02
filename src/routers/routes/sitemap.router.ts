import {permissionMiddleware, requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import {Router} from "express";
import sitemapController from "../../controllers/sitemap.controller";

const sitemapRouter = Router();

sitemapRouter.route(`/`)
    .get([], sitemapController.get)

export default sitemapRouter;