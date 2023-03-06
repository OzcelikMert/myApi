import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import subscriberSchema from "../schemas/subscriber.schema";
import subscriberService from "../services/subscriber.service";
import logMiddleware from "../middlewares/log.middleware";

export default {
    getOne: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof subscriberSchema.getOne> = req;

            serviceResult.data = await subscriberService.getOne({
                ...data.query
            })

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    getMany: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof subscriberSchema.getMany> = req;

            serviceResult.data = await subscriberService.getMany({
                ...data.query
            })

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    add: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof subscriberSchema.post> = req;

            let insertData = await subscriberService.add({
                ...data.body
            });

            serviceResult.data = {_id: insertData._id};

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    deleteOne: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof subscriberSchema.deleteOne> = req;

            serviceResult.data = await subscriberService.deleteOne({
                ...data.query
            })

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    deleteMany: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof subscriberSchema.deleteMany> = req;

            serviceResult.data = await subscriberService.deleteMany({
                ...data.body
            })

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};