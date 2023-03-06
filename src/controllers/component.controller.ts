import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import componentSchema from "../schemas/component.schema";
import componentService from "../services/component.service";
import logMiddleware from "../middlewares/log.middleware";

export default {
    getOne: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof componentSchema.getOne> = req;

            serviceResult.data = await componentService.getOne({
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

            let data: InferType<typeof componentSchema.getMany> = req;

            serviceResult.data = await componentService.getMany({
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

            let data: InferType<typeof componentSchema.post> = req;

            let insertData = await componentService.add({
                ...data.body,
                authorId: req.session.data.id.toString(),
                lastAuthorId: req.session.data.id.toString()
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
            let data: InferType<typeof componentSchema.putOne> = req;

            serviceResult.data = await componentService.updateOne({
                ...data.params,
                ...data.body,
                lastAuthorId: req.session.data.id.toString()
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    deleteMany: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof componentSchema.deleteMany> = req;

            serviceResult.data = await componentService.deleteMany({
                ...data.body
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};