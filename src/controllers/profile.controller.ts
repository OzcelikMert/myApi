import {Request, Response, NextFunction} from "express";
import {Result} from "../utils/service";
import {InferType} from "yup";
import userService from "../services/user.service";
import profileSchema from "../schemas/profile.schema";

export default {
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof profileSchema.put> = req;

        serviceResult.data = await userService.update({
            ...data.body,
            userId: req.session.data.id,
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    updatePassword: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof profileSchema.putPassword> = req;

        serviceResult.data = await userService.update({
            userId: req.session.data.id,
            password: data.body.newPassword
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
};