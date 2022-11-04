import {requestMiddleware} from "../../middlewares/validates";
import {Router} from "express";
import sitemapController from "../../controllers/sitemap.controller";
import sitemapMiddleware from "../../middlewares/sitemap.middleware";
import sitemapSchema from "../../schemas/sitemap.schema";

const sitemapRouter = Router();

sitemapRouter.route(`/:name`)
    .get([requestMiddleware.check(sitemapSchema.get), sitemapMiddleware.check], sitemapController.get)

export default sitemapRouter;