import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import settingSchema from "../schemas/setting.schema";
import settingService from "../services/setting.service";
import logMiddleware from "../middlewares/log.middleware";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof settingSchema.get> = req;
            
            serviceResult.data = await settingService.get({
                ...data.query
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    setGeneral: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof settingSchema.putGeneral> = req;

            serviceResult.data = await settingService.updateGeneral(data.body)

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    setSeo: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof settingSchema.putSeo> = req;

            serviceResult.data = await settingService.updateSEO(data.body)

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    setContactForm: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof settingSchema.putContactForm> = req;

            serviceResult.data = await settingService.updateContactForm(data.body)

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    setStaticLanguage: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof settingSchema.putStaticLanguage> = req;

            serviceResult.data = await settingService.updateStaticLanguage(data.body)

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    setSocialMedia: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof settingSchema.putSocialMedia> = req;

            serviceResult.data = await settingService.updateSocialMedia(data.body)

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    setECommerce: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof settingSchema.putECommerce> = req;

            serviceResult.data = await settingService.updateECommerce(data.body)

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
};