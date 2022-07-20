import {Request, Response} from "express";
import {ErrorCodes, ServiceResult} from "../utils/ajax";
import {InferType} from "yup";
import postSchema from "../schemas/post.schema";
import postService from "../services/post.service";
import postContentService from "../services/postContent.service";
import V, {ClearTypes} from "../library/variable";
import postTermLinkService from "../services/postTermLink.service";

export default {
    getGeneral: (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof postSchema.getGeneral> = req;

        serviceResult.data = postService.select(data.query);

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    get: (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();

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
        let serviceResult = new ServiceResult();

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
        let serviceResult = new ServiceResult();

        let data: InferType<typeof postSchema.post> = req;

        data.body.url = (data.body.url) ? V.clear(data.body.title, ClearTypes.SEO_URL) : data.body.url;

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
                data.body.termId.forEach(termId => {
                    postTermLinkService.insert({
                        postId: serviceResult.data.insertId,
                        termId: termId
                    });
                })
            }
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    update: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof postSchema.put> = req;

        data.body.url = (data.body.url) ? V.clear(data.body.title, ClearTypes.SEO_URL) : data.body.url;

        serviceResult.data = postService.update({
            ...data.body,
            ...data.params
        });

        postContentService.update({
            ...data.body,
            ...data.params
        })

        if(data.body.termId) {
            postTermLinkService.delete(data.params);
            data.body.termId.forEach(termId => {
                postTermLinkService.insert({
                    postId: serviceResult.data.insertId,
                    termId: termId
                });
            })
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    updateStatus: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof postSchema.putStatus> = req;

        data.body.postId.forEach(postId => {
            serviceResult.data = postService.update({
                ...data.body,
                ...data.params,
                postId: postId
            });
        })

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();
        let data: InferType<typeof postSchema.delete> = req;

        serviceResult.data = postService.delete(data.params);
        postContentService.delete(data.params);
        postTermLinkService.delete(data.params);

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};