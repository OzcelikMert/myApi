import {Request, Response, NextFunction} from "express";
import {ServiceResult} from "../utils/ajax";
import {InferType} from "yup";
import userSchema from "../schemas/user.schema";
import userService from "../services/user.service";
import profileSchema from "../schemas/profile.schema";

export default {
    update: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof profileSchema.put> = req;

        serviceResult.data = userService.update({
            ...data.body,
            userId: req.session.data.id,
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    updatePassword: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof profileSchema.putPassword> = req;

        serviceResult.data = userService.update({
            userId: req.session.data.id,
            password: data.body.newPassword
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
};