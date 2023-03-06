import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import postSchema from "../schemas/post.schema";
import postService from "../services/post.service";
import logMiddleware from "../middlewares/log.middleware";

export default {
    getOne: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof postSchema.getOne> = req;

            serviceResult.data = await postService.getOne({
                ...data.params,
                ...data.query
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        })
    },
    getMany: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof postSchema.getMany> = req;

            serviceResult.data = await postService.getMany({
                ...data.query
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        })
    },
    getCount: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postSchema.getCount> = req;

            serviceResult.data = await postService.getCount({
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
            let data: InferType<typeof postSchema.post> = req;

            let insertData = await postService.add({
                ...data.params,
                ...data.body,
                authorId: req.session.data.id.toString(),
                lastAuthorId: req.session.data.id.toString(),
                dateStart: new Date(data.body.dateStart)
            });

            serviceResult.data = {_id: insertData._id};

            res.status(serviceResult.statusCode).json(serviceResult);
        });
    },
    updateOne: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postSchema.putOne> = req;

            serviceResult.data = await postService.updateOne({
                ...data.params,
                ...data.body,
                lastAuthorId: req.session.data.id.toString(),
                dateStart: new Date(data.body.dateStart)
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    updateOneRank: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postSchema.putOneRank> = req;

            serviceResult.data = await postService.updateOneRank({
                ...data.body,
                ...data.params,
                lastAuthorId: req.session.data.id.toString()
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    updateOneView: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postSchema.putOneView> = req;

            serviceResult.data = await postService.updateOneView({
                ...data.params,
                ...data.body
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    updateManyStatus: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postSchema.putManyStatus> = req;

            serviceResult.data = await postService.updateManyStatus({
                ...data.body,
                ...data.params,
                lastAuthorId: req.session.data.id.toString()
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    deleteMany: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postSchema.deleteMany> = req;

            serviceResult.data = await postService.deleteMany({
                ...data.params,
                ...data.body
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};