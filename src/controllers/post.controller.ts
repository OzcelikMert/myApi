import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import postSchema from "../schemas/post.schema";
import postService from "../services/post.service";
import postSitemapUtil, {isPostSitemapRequire} from "../utils/sitemap/post.sitemap.util";
import logMiddleware from "../middlewares/log.middleware";

export default {
    getGeneral: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postSchema.getGeneral> = req;

            serviceResult.data = await postService.select({
                ...data.query,
                isGeneral: true
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    getCount: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postSchema.getCount> = req;

            serviceResult.data = await postService.selectCount({
                ...data.query
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof postSchema.get> = req;

            serviceResult.data = await postService.select({
                ...data.params,
                ...data.query
            });

            if(data.query.page) {
                serviceResult.customData = {
                    allCount: await postService.selectCount({
                        ...data.params,
                        ...data.query
                    })
                }
            }

            res.status(serviceResult.statusCode).json(serviceResult)
        })
    },
    add: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postSchema.post> = req;

            let insertData = await postService.insert({
                ...data.params,
                ...data.body,
                authorId: req.session.data.id.toString(),
                lastAuthorId: req.session.data.id.toString(),
                dateStart: new Date(data.body.dateStart)
            });

            serviceResult.data = [{
                _id: insertData._id
            }]

            res.status(serviceResult.statusCode).json(serviceResult);
        });
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postSchema.put> = req;

            serviceResult.data = await postService.update({
                ...data.params,
                ...data.body,
                lastAuthorId: req.session.data.id.toString(),
                dateStart: new Date(data.body.dateStart)
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
            let data: InferType<typeof postSchema.putStatus> = req;

            serviceResult.data = await postService.updateStatus({
                ...data.body,
                ...data.params,
                lastAuthorId: req.session.data.id.toString()
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    updateView: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postSchema.putView> = req;

            serviceResult.data = await postService.updateView({
                ...data.params,
                ...data.body
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
            let data: InferType<typeof postSchema.delete> = req;

            serviceResult.data = await postService.delete({
                ...data.params,
                ...data.body
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};