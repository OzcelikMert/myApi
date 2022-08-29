import {Request, Response} from "express";
import {ErrorCodes, Result} from "../utils/service";
import {InferType} from "yup";
import V, {ClearTypes} from "../library/variable";
import postTermLinkService from "../services/postTermLink.service";
import postTermSchema from "../schemas/postTerm.schema";
import postTermService from "../services/postTerm.service";
import postTermContentService from "../services/postTermContent.service";
import postContentService from "../services/postContent.service";

export default {
    get: (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

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
        let serviceResult = new Result();

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
        let serviceResult = new Result();

        let data: InferType<typeof postTermSchema.post> = req;

        data.body.url = (!data.body.url) ? V.clear(data.body.title, ClearTypes.SEO_URL) : data.body.url;

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
        let serviceResult = new Result();
        let data: InferType<typeof postTermSchema.put> = req;

        data.body.url = (!data.body.url) ? V.clear(data.body.title, ClearTypes.SEO_URL) : data.body.url;

        serviceResult.data = postTermService.update({
            ...data.body,
            ...data.params
        });

        if(postTermContentService.select({
            ...data.body,
            ...data.params
        }).length > 0) {
            postTermContentService.update({
                ...data.body,
                ...data.params
            })
        }else {
            postTermContentService.insert({
                ...data.body,
                ...data.params
            })
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    updateStatus: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postTermSchema.putStatus> = req;

        serviceResult.data = postTermService.update({
            ...data.body,
            ...data.params
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postTermSchema.delete> = req;

        serviceResult.data = postTermService.delete(data.body);
        postTermContentService.delete(data.body);
        postTermLinkService.delete(data.body);

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};