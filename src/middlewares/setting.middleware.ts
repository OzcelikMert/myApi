import {NextFunction, Request, Response} from "express";
import {SettingId, UserRoles} from "../public/static";
import {ErrorCodes, ServiceResult, StatusCodes} from "../utils/ajax";
import {InferType} from "yup";
import settingSchema from "../schemas/setting.schema";
import languageService from "../services/language.service";

export default {
    check: (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof settingSchema.put> = req;

        data.body.settings.forEach(setting => {
            if(serviceResult.status){
                if(setting.id == SettingId.WebsiteMainLanguage){
                    if(languageService.select({id: Number(setting.value)}).length === 0){
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