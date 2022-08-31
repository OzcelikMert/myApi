import {NextFunction, Request, Response} from "express";
import {SettingId, UserRoles} from "../public/static";
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import {InferType} from "yup";
import settingSchema from "../schemas/setting.schema";
import languageService from "../services/language.service";
import MongoDBHelpers from "../library/mongodb/helpers";

export default {
    check: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof settingSchema.put> = req;

        data.body.settings.forEach(async setting => {
            if(serviceResult.status){
                if(setting.id == SettingId.WebsiteMainLanguage){
                    if((await languageService.select({id: MongoDBHelpers.createObjectId(setting.value)})).length === 0){
                        serviceResult.status = false;
                        serviceResult.errorCode = ErrorCodes.notFound;
                        serviceResult.statusCode = StatusCodes.notFound;
                    }
                }
            }
        })

        if (serviceResult.status) {
            next();
        } else {
            res.status(serviceResult.statusCode).json(serviceResult)
        }
    }
};