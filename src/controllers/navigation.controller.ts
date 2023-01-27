import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import logMiddleware from "../middlewares/log.middleware";
import navigationSchema from "../schemas/navigation.schema";
import navigationService from "../services/navigation.service";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof navigationSchema.get> = req;

            serviceResult.data = await navigationService.select({
                ...data.params,
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

            let insertData = await navigationService.insert({
                ...data.body,
                authorId: req.session.data.id.toString(),
                lastAuthorId: req.session.data.id.toString(),
            });

            res.status(serviceResult.statusCode).json(serviceResult);
        });
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof navigationSchema.put> = req;

            let updatedData = await navigationService.update({
                ...data.params,
                ...data.body,
                lastAuthorId: req.session.data.id.toString(),
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
            let data: InferType<typeof navigationSchema.putStatus> = req;

            await navigationService.updateStatus({
                ...data.body,
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
            let data: InferType<typeof navigationSchema.delete> = req;

            let deletedData = await navigationService.delete({
                ...data.body
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};