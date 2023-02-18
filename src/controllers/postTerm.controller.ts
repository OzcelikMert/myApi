import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import postTermSchema from "../schemas/postTerm.schema";
import postTermService from "../services/postTerm.service";
import postTermSitemapUtil, {isPostTermSitemapRequire} from "../utils/sitemap/postTerm.sitemap.util";
import logMiddleware from "../middlewares/log.middleware";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof postTermSchema.get> = req;

            serviceResult.data = await postTermService.select({
                ...data.params,
                ...data.query
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    add: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof postTermSchema.post> = req;

            let insertData = await postTermService.insert({
                ...data.body,
                ...data.params,
                lastAuthorId: req.session.data.id.toString(),
                authorId: req.session.data.id.toString(),
            });

            serviceResult.data = [{_id: insertData._id}];

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postTermSchema.put> = req;

            serviceResult.data = await postTermService.update({
                ...data.body,
                ...data.params,
                lastAuthorId: req.session.data.id.toString()
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    updateStatus: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postTermSchema.putStatus> = req;

            serviceResult.data = await postTermService.updateStatus({
                ...data.body,
                ...data.params,
                lastAuthorId: req.session.data.id.toString()
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    delete: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postTermSchema.delete> = req;

            serviceResult.data = await postTermService.delete({
                ...data.params,
                ...data.body
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};