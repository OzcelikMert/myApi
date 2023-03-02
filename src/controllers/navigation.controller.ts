import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import logMiddleware from "../middlewares/log.middleware";
import navigationSchema from "../schemas/navigation.schema";
import navigationService from "../services/navigation.service";

export default {
    getOne: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof navigationSchema.getOne> = req;

            serviceResult.data = await navigationService.getOne({
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

            let data: InferType<typeof navigationSchema.getMany> = req;

            serviceResult.data = await navigationService.getMany({
                ...data.query
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        })
    },
    add: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof navigationSchema.post> = req;

            let insertData = await navigationService.add({
                ...data.body,
                authorId: req.session.data.id.toString(),
                lastAuthorId: req.session.data.id.toString(),
            });

            res.status(serviceResult.statusCode).json(serviceResult);
        });
    },
    updateOne: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof navigationSchema.putOne> = req;

            let updatedData = await navigationService.updateOne({
                ...data.params,
                ...data.body,
                lastAuthorId: req.session.data.id.toString(),
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
            let data: InferType<typeof navigationSchema.putOneRank> = req;

            await navigationService.updateOneRank({
                ...data.params,
                ...data.body,
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
            let data: InferType<typeof navigationSchema.putManyStatus> = req;

            await navigationService.updateManyStatus({
                ...data.body,
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
            let data: InferType<typeof navigationSchema.deleteMany> = req;

            let deletedData = await navigationService.deleteMany({
                ...data.body
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};