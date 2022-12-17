import {Request, Response} from "express";
import {Result} from "../library/api";
import {InferType} from "yup";
import settingSchema from "../schemas/setting.schema";
import settingService from "../services/setting.service";
import {UpdateSettingParamDocument} from "../types/services/setting";
import logMiddleware from "../middlewares/log.middleware";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof settingSchema.get> = req;

            serviceResult.data = await settingService.select({
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

            let params: UpdateSettingParamDocument = {
                ...data.body,
            }

            await settingService.update(params)

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

            let params: UpdateSettingParamDocument = {
                ...data.body,
            }

            await settingService.update(params)

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

            let params: UpdateSettingParamDocument = {
                ...data.body,
            }

            await settingService.update(params)

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

            let params: UpdateSettingParamDocument = {
                ...data.body,
            }

            await settingService.update(params)

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};