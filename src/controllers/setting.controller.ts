import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import {InferType} from "yup";
import settingSchema from "../schemas/setting.schema";
import settingService from "../services/setting.service";
import MongoDBHelpers from "../library/mongodb/helpers";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof settingSchema.get> = req;

        serviceResult.data = await settingService.select({
            langId: MongoDBHelpers.createObjectId(data.query.langId),
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    set: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof settingSchema.put> = req;

        if((await settingService.select({})).length > 0) {
            await settingService.update({
                ...data.body,
                defaultLangId: data.body.defaultLangId ? MongoDBHelpers.createObjectId(data.body.defaultLangId) : undefined,
                seoContents: data.body.seoContents ? {
                    ...data.body.seoContents,
                    langId: MongoDBHelpers.createObjectId(data.body.langId)
                } : undefined
            })
        }else {
            serviceResult.data = await settingService.insert({
                ...data.body,
                defaultLangId: MongoDBHelpers.createObjectId(data.body.defaultLangId ?? data.body.langId),
                seoContents: data.body.seoContents ? {
                    ...data.body.seoContents,
                    langId: MongoDBHelpers.createObjectId(data.body.langId)
                } : undefined
            })
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};