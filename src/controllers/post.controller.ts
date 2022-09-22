import {Request, Response} from "express";
import {ErrorCodes, Result} from "../library/api";
import {InferType} from "yup";
import postSchema from "../schemas/post.schema";
import postService from "../services/post.service";
import V, {ClearTypes} from "../library/variable";

export default {
    getGeneral: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.getGeneral> = req;

        serviceResult.data = await postService.select({
            ...data.query
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let data: InferType<typeof postSchema.get> = req;

        serviceResult.data = await postService.select({
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

        let data: InferType<typeof postSchema.post> = req;

        data.body.contents.url = (data.body.contents.url) ?? V.clear(data.body.contents.title, ClearTypes.SEO_URL);

        serviceResult.data = await postService.insert({
            ...data.params,
            ...data.body,
            authorId: req.session.data.id.toString(),
            dateStart: new Date(data.body.dateStart),
            isFixed: data.body.isFixed == 1,
            ...(data.body.isPrimary ? {isPrimary: data.body.isPrimary == 1} : {})
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.put> = req;

        data.body.contents.url = (data.body.contents.url) ?? V.clear(data.body.contents.title, ClearTypes.SEO_URL);

        serviceResult.data = await postService.update({
            ...data.params,
            ...data.body,
            lastAuthorId: req.session.data.id.toString(),
            isFixed: data.body.isFixed == 1,
            dateStart: new Date(data.body.dateStart),
            ...(data.body.isPrimary ? {isPrimary: data.body.isPrimary == 1} : {})
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    updateStatus: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.putStatus> = req;

        serviceResult.data = await postService.updateStatus({
            ...data.body,
            ...data.params,
            lastAuthorId: req.session.data.id.toString()
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.delete> = req;

        serviceResult.data = await postService.delete({
            ...data.body
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};