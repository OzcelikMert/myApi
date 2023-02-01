import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import languageSchema from "../schemas/language.schema";
import languageService from "../services/language.service";
import logMiddleware from "../middlewares/log.middleware";
import fs from "fs";
import {Config} from "../config";
import path from "path";

export default {
    getFlags: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            const fileType = [".jpg", ".png", ".webp", ".gif", ".jpeg"];

            await new Promise(resolve => {
                fs.readdir(Config.paths.uploads.flags, (err, images) => {
                    for(let i=0; i < images.length; i++) {
                        let image = images[i];
                        if(fs.existsSync(path.resolve(Config.paths.uploads.flags, image))) {
                            if (fileType.includes(path.extname(image))){
                                serviceResult.data.push(image)
                            }
                        }
                    }
                    resolve(0)
                });
            })

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    get: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof languageSchema.get> = req;

            serviceResult.data = await languageService.select({
                ...data.params
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
            let data: InferType<typeof languageSchema.post> = req;

            serviceResult.data = await languageService.insert({
                ...data.body,
            });

            res.status(serviceResult.statusCode).json(serviceResult);
        });
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof languageSchema.put> = req;

            serviceResult.data = await languageService.update({
                ...data.params,
                ...data.body,
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
};