import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import userSchema from "../schemas/user.schema";
import userService from "../services/user.service";
import {StatusId} from "../constants/status";
import Variable from "../library/variable";
import {UpdateUserParamDocument} from "../types/services/user";
import logMiddleware from "../middlewares/log.middleware";

export default {
    get: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof userSchema.get> = req;

            serviceResult.data = await userService.select({
                ...data.params
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

            await userService.insert({
                ...data.body,
                ...(data.body.banDateEnd ? {banDateEnd: new Date(data.body.banDateEnd)} : {banDateEnd: undefined})
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof userSchema.put> = req;

            await userService.update({
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
    delete: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof userSchema.delete> = req;

            await userService.delete(data.params);

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};