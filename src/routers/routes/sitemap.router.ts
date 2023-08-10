import {Router} from "express";
import sitemapController from "../../controllers/sitemap.controller";
import sitemapSchema from "../../schemas/sitemap.schema";
import PagePaths from "../../constants/pagePaths";
import requestMiddleware from "../../middlewares/validates/request.middleware";

const sitemapRouter = Router();

sitemapRouter.route(PagePaths.sitemap(false).maps())
    .get(sitemapController.getMaps)

sitemapRouter.route(PagePaths.sitemap(false).post())
    .get([requestMiddleware.check(sitemapSchema.getPost)], sitemapController.getPost)

sitemapRouter.route(PagePaths.sitemap(false).postTerm())
    .get([requestMiddleware.check(sitemapSchema.getPostTerm)], sitemapController.getPostTerm)

export default sitemapRouter;