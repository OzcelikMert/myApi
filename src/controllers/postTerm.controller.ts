import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import postTermSchema from "../schemas/postTerm.schema";
import postTermService from "../services/postTerm.service";
import postTermSitemapUtil, {isPostTermSitemapRequire} from "../utils/sitemap/postTerm.sitemap.util";
import logMiddleware from "../middlewares/log.middleware";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof postTermSchema.get> = req;

            serviceResult.data = await postTermService.select({
                ...data.params,
                ...data.query
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    add: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let data: InferType<typeof postTermSchema.post> = req;

            let insertData = await postTermService.insert({
                ...data.body,
                ...data.params,
                authorId: req.session.data.id.toString(),
            });

            if(isPostTermSitemapRequire(data.params.postTypeId)){
                insertData.sitemap = await postTermSitemapUtil.add({
                    _id: insertData._id.toString(),
                    url: data.body.contents.url ?? "",
                    langId: data.body.contents.langId,
                    typeId: data.params.typeId,
                    postTypeId: data.params.postTypeId
                });
                await insertData.save();
            }

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postTermSchema.put> = req;

            let updatedData = await postTermService.update({
                ...data.body,
                ...data.params,
                lastAuthorId: req.session.data.id.toString()
            });

            if(isPostTermSitemapRequire(data.params.postTypeId)){
                for (const updated of updatedData) {
                    await postTermSitemapUtil.update({
                        _id: updated._id.toString(),
                        url: data.body.contents.url ?? "",
                        langId: data.body.contents.langId,
                        typeId: data.params.typeId,
                        postTypeId: data.params.postTypeId,
                        sitemap: updated.sitemap ?? ""
                    });
                }
            }

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    updateStatus: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postTermSchema.putStatus> = req;

            await postTermService.updateStatus({
                ...data.body,
                ...data.params,
                lastAuthorId: req.session.data.id.toString()
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    updateView: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postTermSchema.putView> = req;

            await postTermService.updateView({
                ...data.params,
                ...data.body
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    delete: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof postTermSchema.delete> = req;

            let deletedData = await postTermService.delete({
                ...data.params,
                ...data.body
            });

            if(isPostTermSitemapRequire(data.params.postTypeId)){
                for (const deleted of deletedData) {
                    await postTermSitemapUtil.delete({
                        _id: deleted._id.toString(),
                        typeId: data.params.typeId,
                        sitemap: deleted.sitemap ?? ""
                    });
                }
            }

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};