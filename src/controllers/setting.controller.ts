import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import {InferType} from "yup";
import settingSchema from "../schemas/setting.schema";
import settingService from "../services/setting.service";
import MongoDBHelpers from "../library/mongodb/helpers";
import languageService from "../services/language.service";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof settingSchema.get> = req;

        serviceResult.data = await settingService.select({
            langId: data.query.langId ? MongoDBHelpers.createObjectId(data.query.langId) : undefined,
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
                    langId: MongoDBHelpers.createObjectId(data.body.seoContents.langId)
                } : undefined
            })
        }else {
            if(!data.body.defaultLangId) {
                let lang = await languageService.select({});
                data.body.defaultLangId = lang[0]._id.toString();
            }

            serviceResult.data = await settingService.insert({
                ...data.body,
                defaultLangId: MongoDBHelpers.createObjectId(data.body.defaultLangId),
                seoContents: data.body.seoContents ? {
                    ...data.body.seoContents,
                    langId: MongoDBHelpers.createObjectId(data.body.seoContents.langId)
                } : undefined
            })
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};