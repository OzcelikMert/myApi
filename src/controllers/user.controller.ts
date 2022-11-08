import {Request, Response} from "express";
import {ErrorCodes, Result} from "../library/api";
import {InferType} from "yup";
import userSchema from "../schemas/user.schema";
import userService from "../services/user.service";
import MongoDBHelpers from "../library/mongodb/helpers";
import {StatusId} from "../constants/status";
import Variable from "../library/variable";
import {SelectUserResultDocument, UpdateUserParamDocument} from "../types/services/user";
import {Config} from "../config";

export default {
    get: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof userSchema.get> = req;

        serviceResult.data = await userService.select({
            ...data.params
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    add: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof userSchema.post> = req;

        await userService.insert(data.body);

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof userSchema.put> = req;

        let params: UpdateUserParamDocument = {
            ...data.body,
            ...data.params,
            banDateEnd: undefined,
            ...(data.body.banDateEnd ? {banDateEnd: new Date(data.body.banDateEnd)} : {})
        }

        if(Variable.isEmpty(params.password)){
            delete params.password;
        }

        await userService.update(params);

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof userSchema.delete> = req;

        await userService.update({
            ...data.params,
            statusId: StatusId.Deleted
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};