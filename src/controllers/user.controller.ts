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
                ...data.params,
                ...data.query
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    getOneWithUrl: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof userSchema.getOneWithUrl> = req;

            serviceResult.data = await userService.getOneWithUrl({
                ...data.params,
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    getOneLogin: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof userSchema.getOneLogin> = req;

            serviceResult.data = await userService.getOneLogin({
                ...data.params
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

            await userService.add({
                ...data.body,
                ...(data.body.banDateEnd ? {banDateEnd: new Date(data.body.banDateEnd)} : {banDateEnd: undefined})
            });

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

            await userService.getOne({
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

            await userService.updateProfile({
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

            await userService.updatePassword({
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

            await userService.deleteOne(data.params);

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};