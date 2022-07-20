import {Request, Response} from "express";
import {ErrorCodes, ServiceResult, StatusCodes} from "../utils/ajax";
import {InferType} from "yup";
import languageSchema from "../schemas/language.schema";
import languageService from "../services/language.service";

export default {
    get: (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof languageSchema.get> = req;

        serviceResult.data = languageService.select(data.query);

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};