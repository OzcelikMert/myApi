import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import languageSchema from "../schemas/language.schema";
import languageService from "../services/language.service";
import logMiddleware from "../middlewares/log.middleware";

export default {
    get: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof languageSchema.get> = req;

            serviceResult.data = await languageService.select({});

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};