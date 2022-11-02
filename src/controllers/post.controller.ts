import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import postSchema from "../schemas/post.schema";
import postService from "../services/post.service";
import languageService from "../services/language.service";
import sitemapUtil, {SitemapNameTypes} from "../utils/functions/sitemap.util";
import {PostTypeId} from "../constants/postTypes";
import {Config} from "../config";
import sitemapController from "./sitemap.controller";

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

        let insertData = await postService.insert({
            ...data.params,
            ...data.body,
            authorId: req.session.data.id.toString(),
            dateStart: new Date(data.body.dateStart),
            ...(data.body.isFixed ? {isFixed: data.body.isFixed == 1} : {}),
            ...(data.body.siteMap ? {siteMap: data.body.siteMap} : {}),
        });

        let languages = await languageService.select({id: data.body.contents.langId});
        if (languages.length > 0) {
            let language = languages[0];
            insertData.sitemap = await sitemapUtil.add(
                data.params.typeId == PostTypeId.Page ? SitemapNameTypes.Page : SitemapNameTypes.Post,
                [{
                    _id: insertData._id.toString(),
                    loc: data.body.contents.url || "",
                    lastmod: new Date().toISOString(),
                    changefreq: "weekly",
                    priority: "0.5",
                    "xhtml:link": [
                        {
                            $: {
                                hreflang: `${language.shortKey}-${language.locale}`,
                                rel: "alternate",
                                href: data.body.contents.url || ""
                            }
                        }
                    ]
                }]
            );
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

        for (const updated of updatedData) {
            let languages = await languageService.select({id: data.body.contents.langId});
            if(languages.length > 0){
                let language = languages[0]
                await sitemapUtil.edit(
                    updated.sitemap || "",
                    data.params.typeId == PostTypeId.Page ? SitemapNameTypes.Page : SitemapNameTypes.Post,
                    updated._id.toString(),
                    {
                        ...(Config.defaultLangId == data.body.contents.langId ? {loc: data.body.contents.url || ""} : {}),
                        "xhtml:link": [
                            {
                                $: {
                                    hreflang: `${language.shortKey}-${language.locale}`,
                                    rel: "alternate",
                                    href: data.body.contents.url || ""
                                }
                            }
                        ]
                    }
                );
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

        let deletedData = await postService.delete({
            ...data.body
        });

        for (const deleted of deletedData) {
            await sitemapUtil.delete(
                deleted.sitemap || "",
                deleted.typeId == PostTypeId.Page ? SitemapNameTypes.Page : SitemapNameTypes.Post,
                deleted._id.toString(),
            );
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};