import {requestMiddleware} from "../../middlewares/validates";
import {Router} from "express";
import sitemapController from "../../controllers/sitemap.controller";
import sitemapMiddleware from "../../middlewares/sitemap.middleware";
import sitemapSchema from "../../schemas/sitemap.schema";
import PagePaths from "../../constants/pagePaths";

const sitemapRouter = Router();

sitemapRouter.route(PagePaths.sitemap(false).withName())
    .get([requestMiddleware.check(sitemapSchema.get), sitemapMiddleware.check], sitemapController.get)

export default sitemapRouter;