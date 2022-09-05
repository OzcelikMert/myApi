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

        if (serviceResult.status) {
            next();
        } else {
            res.status(serviceResult.statusCode).json(serviceResult)
        }
    }
};