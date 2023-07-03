import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import userSchema from "../schemas/user.schema";
import userService from "../services/user.service";
import logMiddleware from "../middlewares/log.middleware";

export default {
    getOne: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof userSchema.getOne> = req;

            serviceResult.data = await userService.getOne({
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
            let data: InferType<typeof userSchema.getMany> = req;

            serviceResult.data = await userService.getMany({
                ...data.query
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    add: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof userSchema.post> = req;

            let insertData = await userService.add({
                ...data.body,
                ...(data.body.banDateEnd ? {banDateEnd: new Date(data.body.banDateEnd)} : {banDateEnd: undefined})
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
            let data: InferType<typeof userSchema.putOne> = req;

            serviceResult.data = await userService.updateOne({
                ...data.params,
                ...data.body,
                ...(data.body.banDateEnd ? {banDateEnd: new Date(data.body.banDateEnd)} : {banDateEnd: undefined})
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    updateProfile: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof userSchema.putProfile> = req;

            serviceResult.data = await userService.updateOne({
                ...data.body,
                _id: req.session.data.id.toString(),
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    updatePassword: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof userSchema.putPassword> = req;

            serviceResult.data = await userService.updateOne({
                _id: req.session.data.id.toString(),
                password: data.body.newPassword
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    deleteOne: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof userSchema.deleteOne> = req;

            serviceResult.data = await userService.deleteOne(data.params);

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};