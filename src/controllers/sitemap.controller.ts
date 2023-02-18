import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import sitemapSchema from "../schemas/sitemap.schema";
import logMiddleware from "../middlewares/log.middleware";
import sitemapService from "../services/sitemap.service";
import {PostTypeId} from "../constants/postTypes";
import {PostTermTypeId} from "../constants/postTermTypes";

export default {
    getMaps: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            serviceResult.data = {
                post: await sitemapService.selectPostCountForType({typeId: [PostTypeId.Page, PostTypeId.Portfolio, PostTypeId.Blog]}),
                postTerm: [] //await sitemapService.selectPostTermCountForType({typeId: [PostTermTypeId.Category, PostTermTypeId.Tag]})
            };

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    getPost: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof sitemapSchema.getPost> = req;

            serviceResult.data = await sitemapService.selectPost(data.query);

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    getPostTerm: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof sitemapSchema.getPostTerm> = req;

            serviceResult.data = await sitemapService.selectPostTerm(data.query)

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};