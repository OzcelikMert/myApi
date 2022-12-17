import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import postSchema from "../schemas/post.schema";
import postService from "../services/post.service";
import postSitemapUtil, {isPostSitemapRequire} from "../utils/sitemap/post.sitemap.util";
import logMiddleware from "../middlewares/log.middleware";

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
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof postSchema.get> = req;

            serviceResult.data = await postService.select({
                ...data.params,
                ...data.query
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        })
    },
    add: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.post> = req;

        let insertData = await postService.insert({
            ...data.params,
            ...data.body,
            authorId: req.session.data.id.toString(),
            dateStart: new Date(data.body.dateStart),
            ...(data.body.isFixed ? {isFixed: data.body.isFixed == 1} : {}),
            ...(data.body.siteMap ? {siteMap: data.body.siteMap} : {}),
        });

        if(isPostSitemapRequire(data.params.typeId)){
            insertData.sitemap = await postSitemapUtil.add({
                _id: insertData._id.toString(),
                url: data.body.contents.url ?? "",
                langId: data.body.contents.langId,
                typeId: data.params.typeId,
                pageTypeId: insertData.pageTypeId
            });
            await insertData.save();
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.put> = req;

        let updatedData = await postService.update({
            ...data.params,
            ...data.body,
            lastAuthorId: req.session.data.id.toString(),
            dateStart: new Date(data.body.dateStart),
            ...(data.body.isFixed ? {isFixed: data.body.isFixed == 1} : {}),
        });

        if(isPostSitemapRequire(data.params.typeId)){
            for (const updated of updatedData) {
                await postSitemapUtil.update({
                    _id: updated._id.toString(),
                    url: data.body.contents.url ?? "",
                    langId: data.body.contents.langId,
                    typeId: data.params.typeId,
                    sitemap: updated.sitemap ?? "",
                    pageTypeId: updated.pageTypeId
                });
            }
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    updateStatus: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.putStatus> = req;

        await postService.updateStatus({
            ...data.body,
            ...data.params,
            lastAuthorId: req.session.data.id.toString()
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    updateView: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.putView> = req;

        await postService.updateView({
            ...data.params,
            ...data.body
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postSchema.delete> = req;

        let deletedData = await postService.delete({
            ...data.params,
            ...data.body
        });

        if(isPostSitemapRequire(data.params.typeId)){
            for (const deleted of deletedData) {
                await postSitemapUtil.delete({
                    _id: deleted._id.toString(),
                    typeId: data.params.typeId,
                    sitemap: deleted.sitemap ?? ""
                });
            }
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};