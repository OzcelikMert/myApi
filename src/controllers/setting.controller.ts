import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import {InferType} from "yup";
import settingSchema from "../schemas/setting.schema";
import settingService from "../services/setting.service";

export default {
    get: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof settingSchema.get> = req;

        serviceResult.data = await settingService.select();

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    set: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof settingSchema.put> = req;

        /*data.body.settings.forEach(async setting => {
            if(await (settingService.select(setting)).length > 0) {
                serviceResult.data = settingService.update(setting);
            }else {
                serviceResult.data = settingService.insert(setting);
            }
        })*/

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};