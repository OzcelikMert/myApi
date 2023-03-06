import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import postTermSchema from "../schemas/postTerm.schema";
import postTermService from "../services/postTerm.service";
import logMiddleware from "../middlewares/log.middleware";

export default {
    getOne: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof postTermSchema.getOne> = req;

            serviceResult.data = await postTermService.getOne({
                ...data.params,
                ...data.query
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    getMany: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof postTermSchema.getMany> = req;

            serviceResult.data = await postTermService.getMany({
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

            let insertData = await postTermService.add({
                ...data.body,
                ...data.params,
                lastAuthorId: req.session.data.id.toString(),
                authorId: req.session.data.id.toString(),
            });

            serviceResult.data = {_id: insertData._id};

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    updateOne: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postTermSchema.putOne> = req;

            serviceResult.data = await postTermService.updateOne({
                ...data.body,
                ...data.params,
                lastAuthorId: req.session.data.id.toString()
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
            let data: InferType<typeof postTermSchema.putOneRank> = req;

            serviceResult.data = await postTermService.updateOneRank({
                ...data.body,
                ...data.params,
                lastAuthorId: req.session.data.id.toString()
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
            let data: InferType<typeof postTermSchema.putManyStatus> = req;

            serviceResult.data = await postTermService.updateManyStatus({
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
            let data: InferType<typeof postTermSchema.deleteMany> = req;

            serviceResult.data = await postTermService.deleteMany({
                ...data.params,
                ...data.body
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};