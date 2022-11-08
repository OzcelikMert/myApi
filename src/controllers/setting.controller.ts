import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import {InferType} from "yup";
import settingSchema from "../schemas/setting.schema";
import settingService from "../services/setting.service";
import {UpdateSettingParamDocument} from "../types/services/setting";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof settingSchema.get> = req;

        serviceResult.data = await settingService.select({
            ...data.query
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    set: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof settingSchema.put> = req;

        let params: UpdateSettingParamDocument = {
            ...data.body,
        }

        await settingService.update(params)

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};