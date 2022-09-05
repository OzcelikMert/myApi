import {Request, Response} from "express";
import {ErrorCodes, Result} from "../library/api";
import {InferType} from "yup";
import userSchema from "../schemas/user.schema";
import userService from "../services/user.service";
import MongoDBHelpers from "../library/mongodb/helpers";
import {StatusId} from "../constants/status.const";

export default {
    get: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof userSchema.get> = req;

        serviceResult.data = await userService.select({
            ...data.params,
            userId: data.params.userId ?  MongoDBHelpers.createObjectId(data.params.userId) : undefined
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    add: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof userSchema.post> = req;

        serviceResult.data = await userService.insert(data.body);

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof userSchema.put> = req;

        serviceResult.data = await userService.update({
            ...data.body,
            ...data.params,
            userId: MongoDBHelpers.createObjectId(data.params.userId),
            banDateEnd: data.body.banDateEnd ? new Date(data.body.banDateEnd) : undefined
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof userSchema.delete> = req;

        serviceResult.data = await userService.update({
            userId:  MongoDBHelpers.createObjectId(data.params.userId),
            statusId: StatusId.Deleted
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};