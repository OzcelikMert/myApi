import {Request, Response} from "express";
import {Result} from "../library/api";
import fs from "fs";
import {SitemapDocument} from "../library/types/sitemap";
import * as path from "path";
import SitemapFolderPaths from "../library/sitemap/paths";
import {InferType} from "yup";
import sitemapSchema from "../schemas/sitemap.schema";
import logMiddleware from "../middlewares/log.middleware";

export default {
    get: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof sitemapSchema.get> = req;

            serviceResult.data = await new Promise<SitemapDocument>(resolve => {
                fs.readFile(path.resolve(SitemapFolderPaths.main, `${data.params.name}.json`), "utf8", (err, data) => {
                    resolve(JSON.parse(data))
                });
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
};