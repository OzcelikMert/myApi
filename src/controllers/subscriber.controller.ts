import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import {InferType} from "yup";
import subscriberSchema from "../schemas/subscriber.schema";
import subscriberService from "../services/subscriber.service";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof subscriberSchema.get> = req;

        serviceResult.data = await subscriberService.select({
            ...data.query
        })

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    add: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof subscriberSchema.post> = req;

        serviceResult.data = await subscriberService.insert({
            ...data.body
        })

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof subscriberSchema.delete> = req;

        serviceResult.data = await subscriberService.delete({
            ...data.body
        })

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    deleteWithEmail: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof subscriberSchema.deleteWithEmail> = req;

        serviceResult.data = await subscriberService.delete({
            ...data.params
        })

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};