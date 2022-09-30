import {Request, Response} from "express";
import {ErrorCodes, Result} from "../library/api";
import {InferType} from "yup";
import V, {ClearTypes} from "../library/variable";
import postTermSchema from "../schemas/postTerm.schema";
import postTermService from "../services/postTerm.service";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let data: InferType<typeof postTermSchema.get> = req;

        serviceResult.data = await postTermService.select({
            ...data.params,
            ...data.query
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    add: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let data: InferType<typeof postTermSchema.post> = req;

        data.body.contents.url = (data.body.contents.url) ?? V.clear(data.body.contents.title, ClearTypes.SEO_URL);

        serviceResult.data = await postTermService.insert({
            ...data.body,
            ...data.params,
            authorId: req.session.data.id.toString(),
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postTermSchema.put> = req;

        data.body.contents.url = (data.body.contents.url) ?? V.clear(data.body.contents.title, ClearTypes.SEO_URL);

        serviceResult.data = await postTermService.update({
            ...data.body,
            ...data.params,
            lastAuthorId: req.session.data.id.toString()
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    updateStatus: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postTermSchema.putStatus> = req;

        serviceResult.data = await postTermService.updateStatus({
            ...data.body,
            ...data.params,
            lastAuthorId: req.session.data.id.toString()
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postTermSchema.delete> = req;

        serviceResult.data = await postTermService.delete({
            ...data.body
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};