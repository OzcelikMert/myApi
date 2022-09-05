import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import {InferType} from "yup";
import languageSchema from "../schemas/language.schema";
import languageService from "../services/language.service";

export default {
    get: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof languageSchema.get> = req;

        serviceResult.data = await languageService.select({});

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};