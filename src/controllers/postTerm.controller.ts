import {Request, Response} from "express";
import {ErrorCodes, ServiceResult} from "../utils/ajax";
import {InferType} from "yup";
import V, {ClearTypes} from "../library/variable";
import postTermLinkService from "../services/postTermLink.service";
import postTermSchema from "../schemas/postTerm.schema";
import postTermService from "../services/postTerm.service";
import postTermContentService from "../services/postTermContent.service";

export default {
    get: (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();

        let data: InferType<typeof postTermSchema.get> = req;

        serviceResult.data = postTermService.select({
            ...data.params,
            ...data.query
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    getWithType: (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();

        let data: InferType<typeof postTermSchema.getWithType> = req;

        serviceResult.data = postTermService.select({
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

        let data: InferType<typeof postTermSchema.post> = req;

        data.body.url = (data.body.url) ? V.clear(data.body.title, ClearTypes.SEO_URL) : data.body.url;

        serviceResult.data = postTermService.insert({
            ...data.body,
            ...data.params
        });

        if(serviceResult.data.insertId) {
            postTermContentService.insert({
                termId: serviceResult.data.insertId,
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
        let data: InferType<typeof postTermSchema.put> = req;

        data.body.url = (data.body.url) ? V.clear(data.body.title, ClearTypes.SEO_URL) : data.body.url;

        serviceResult.data = postTermService.update({
            ...data.body,
            ...data.params
        });

        postTermContentService.update({
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
        let data: InferType<typeof postTermSchema.putStatus> = req;

        data.body.termId.forEach(termId => {
            serviceResult.data = postTermService.update({
                ...data.body,
                ...data.params,
                termId: termId
            });
        })

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof postTermSchema.delete> = req;

        serviceResult.data = postTermService.delete(data.params);
        postTermContentService.delete(data.params);
        postTermLinkService.delete(data.params);

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};