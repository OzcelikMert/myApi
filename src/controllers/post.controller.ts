import {Request, Response} from "express";
import {ErrorCodes, Result} from "../utils/service";
import {InferType} from "yup";
import postSchema from "../schemas/post.schema";
import postService from "../services/mysql/post.service";
import postContentService from "../services/mysql/postContent.service";
import V, {ClearTypes} from "../library/variable";
import postTermLinkService from "../services/mysql/postTermLink.service";

export default {
    getGeneral: (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.getGeneral> = req;

        serviceResult.data = postService.select(data.query);

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    get: (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let data: InferType<typeof postSchema.get> = req;

        serviceResult.data = postService.select({
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

        let data: InferType<typeof postSchema.getWithType> = req;

        serviceResult.data = postService.select({
            ...data.params,
            ...data.query
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    add: (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();

        let data: InferType<typeof postSchema.post> = req;

        data.body.url = (!data.body.url) ? V.clear(data.body.title, ClearTypes.SEO_URL) : data.body.url;

        serviceResult.data = postService.insert({
            ...data.body,
            authorId: req.session.data.id
        });

        if(serviceResult.data.insertId) {
            postContentService.insert({
                postId: serviceResult.data.insertId,
                ...data.body
            })

            if(data.body.termId) {
                postTermLinkService.insert(data.body.termId.map(termId => ({
                    termId: termId,
                    postId: serviceResult.data.insertId
                })));
            }
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    update: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.put> = req;

        data.body.url = (!data.body.url) ? V.clear(data.body.title, ClearTypes.SEO_URL) : data.body.url;

        serviceResult.data = postService.update({
            ...data.body,
            ...data.params
        });

        if(postContentService.select({
            ...data.body,
            ...data.params
        }).length > 0) {
            postContentService.update({
                ...data.body,
                ...data.params
            })
        }else {
            postContentService.insert({
                ...data.body,
                ...data.params
            })
        }


        if(data.body.termId) {
            postTermLinkService.delete(data.params);
            postTermLinkService.insert(data.body.termId.map(termId => ({
                termId: termId,
                postId: data.params.postId
            })));
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    updateStatus: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.putStatus> = req;

        serviceResult.data = postService.update({
            ...data.body,
            ...data.params
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.delete> = req;

        serviceResult.data = postService.delete(data.body);
        postContentService.delete(data.body);
        postTermLinkService.delete(data.body);

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};