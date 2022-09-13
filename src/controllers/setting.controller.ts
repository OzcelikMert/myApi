import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import {InferType} from "yup";
import settingSchema from "../schemas/setting.schema";
import settingService from "../services/setting.service";
import MongoDBHelpers from "../library/mongodb/helpers";
import {UpdateSettingParamDocument} from "../types/services/setting";
import Variable from "../library/variable";

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

        let params: UpdateSettingParamDocument = {
            ...data.body,
            defaultLangId: data.body.defaultLangId ? MongoDBHelpers.createObjectId(data.body.defaultLangId) : undefined,
            seoContents: data.body.seoContents ? {
                ...data.body.seoContents,
                langId: MongoDBHelpers.createObjectId(data.body.seoContents.langId)
            } : undefined
        }

        if(Variable.isEmpty(params.defaultLangId)) {
            delete params.defaultLangId;
        }

        if(Variable.isEmpty(params.seoContents)) {
            delete params.seoContents;
        }

        serviceResult.data = await settingService.update(params)

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};