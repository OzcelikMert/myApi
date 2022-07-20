import {Request, Response} from "express";
import {ErrorCodes, ServiceResult} from "../utils/ajax";
import {InferType} from "yup";
import V, {ClearTypes} from "../library/variable";
import navigateSchema from "../schemas/navigate.schema";
import navigateService from "../services/navigate.service";
import navigateContentService from "../services/navigateContent.service";

export default {
    get: (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();

        let data: InferType<typeof navigateSchema.get> = req;

        serviceResult.data = navigateService.select({
            ...data.query
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    getWithId: (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();

        let data: InferType<typeof navigateSchema.getWithId> = req;

        serviceResult.data = navigateService.select({
            ...data.params,
            ...data.query
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    add: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();

        let data: InferType<typeof navigateSchema.post> = req;

        data.body.url = (data.body.url) ? V.clear(data.body.title, ClearTypes.SEO_URL) : data.body.url;

        serviceResult.data = navigateService.insert({
            ...data.body,
        });

        if(serviceResult.data.insertId) {
            navigateContentService.insert({
                navigateId: serviceResult.data.insertId,
                ...data.body
            })
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    update: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof navigateSchema.put> = req;

        data.body.url = (data.body.url) ? V.clear(data.body.title, ClearTypes.SEO_URL) : data.body.url;

        serviceResult.data = navigateService.update({
            ...data.body,
            ...data.params
        });

        navigateContentService.update({
            ...data.body,
            ...data.params
        })

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    updateStatus: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof navigateSchema.putStatus> = req;

        data.body.navigateId.forEach(navigateId => {
            serviceResult.data = navigateService.update({
                ...data.body,
                navigateId: navigateId
            });
        })

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof navigateSchema.delete> = req;

        serviceResult.data = navigateService.delete(data.params);
        navigateContentService.delete(data.params);

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};