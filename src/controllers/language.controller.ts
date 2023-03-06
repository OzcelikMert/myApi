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
    getOne: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof languageSchema.getOne> = req;

            serviceResult.data = await languageService.getOne({
                ...data.query,
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    getMany: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof languageSchema.getMany> = req;

            serviceResult.data = await languageService.getMany({
                ...data.query
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
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
    add: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof languageSchema.post> = req;

            let insertData = await languageService.add({
                ...data.body,
            });

            serviceResult.data = {_id: insertData._id};

            res.status(serviceResult.statusCode).json(serviceResult);
        });
    },
    updateOne: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof languageSchema.putOne> = req;

            serviceResult.data = await languageService.updateOne({
                ...data.params,
                ...data.body,
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    updateOneRank: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof languageSchema.putOneRank> = req;

            serviceResult.data = await languageService.updateOneRank({
                ...data.params,
                ...data.body,
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
};