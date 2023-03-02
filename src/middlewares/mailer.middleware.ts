import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import {InferType} from "yup";
import mailerSchema from "../schemas/mailer.schema";
import settingService from "../services/setting.service";
import logMiddleware from "./log.middleware";

export default {
    checkContactForm: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof mailerSchema.post> = req;

            let setting = (await settingService.get({}));

            if((typeof setting.contactForms === "undefined") || (setting.contactForms && setting.contactForms?.indexOfKey("_id", data.body.contactFormId) < 0)){
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.notFound;
                serviceResult.statusCode = StatusCodes.notFound;
            }

            if (serviceResult.status) {
                next();
            } else {
                res.status(serviceResult.statusCode).json(serviceResult)
            }
        });
    }
};