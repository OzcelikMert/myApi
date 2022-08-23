import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import {InferType} from "yup";
import seoSchema from "../schemas/seo.schema";
import seoService from "../services/mysql/seo.service";

export default {
    get: (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof seoSchema.get> = req;

        serviceResult.data = seoService.select(data.query);

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    set: (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof seoSchema.put> = req;

        if(seoService.select(data.body).length > 0) {
            serviceResult.data = seoService.update(data.body);
        }else {
            serviceResult.data = seoService.insert(data.body);
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};