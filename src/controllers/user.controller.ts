import {Request, Response} from "express";
import {ErrorCodes, ServiceResult} from "../utils/ajax";
import {InferType} from "yup";
import userSchema from "../schemas/user.schema";
import {StatusId} from "../public/static";
import userService from "../services/user.service";

export default {
    get: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof userSchema.get> = req;

        serviceResult.data = userService.select(data.params);

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    add: (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof userSchema.post> = req;

        serviceResult.data = userService.insert(data.body);

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    update: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof userSchema.put> = req;

        serviceResult.data = userService.update({
            ...data.body,
            ...data.params
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof userSchema.delete> = req;

        serviceResult.data = userService.update({
            userId: data.params.userId,
            statusId: StatusId.Deleted
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};