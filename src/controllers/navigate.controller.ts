import {Request, Response} from "express";
import {ErrorCodes, Result} from "../library/api";
import {InferType} from "yup";
import V, {ClearTypes} from "../library/variable";
import navigateSchema from "../schemas/navigate.schema";
import navigateService from "../services/navigate.service";
import MongoDBHelpers from "../library/mongodb/helpers";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let data: InferType<typeof navigateSchema.get> = req;

        serviceResult.data = await navigateService.select({
            ...data.params,
            ...data.query,
            langId: MongoDBHelpers.createObjectId(data.query.langId),
            navigateId: data.params.navigateId ? MongoDBHelpers.createObjectId(data.params.navigateId) : undefined
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    add: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let data: InferType<typeof navigateSchema.post> = req;

        data.body.contents.url = (data.body.contents.url) ?? V.clear(data.body.contents.title, ClearTypes.SEO_URL);

        serviceResult.data = await navigateService.insert({
            ...data.body,
            authorId: req.session.data.id,
            mainId: data.body.mainId ? MongoDBHelpers.createObjectId(data.body.mainId) : undefined,
            contents: {
                ...data.body.contents,
                langId: MongoDBHelpers.createObjectId(data.body.contents.langId)
            }
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof navigateSchema.put> = req;

        data.body.contents.url = (data.body.contents.url) ?? V.clear(data.body.contents.title, ClearTypes.SEO_URL);

        serviceResult.data = await navigateService.update({
            ...data.body,
            ...data.params,
            navigateId: MongoDBHelpers.createObjectId(data.params.navigateId),
            lastAuthorId: req.session.data.id,
            mainId: data.body.mainId ? MongoDBHelpers.createObjectId(data.body.mainId) : undefined,
            contents: {
                ...data.body.contents,
                langId: MongoDBHelpers.createObjectId(data.body.contents.langId)
            }
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    updateStatus: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof navigateSchema.putStatus> = req;

        serviceResult.data = await navigateService.update({
            ...data.body,
            lastAuthorId: req.session.data.id,
            navigateId: data.body.navigateId.map(navigateId => MongoDBHelpers.createObjectId(navigateId))
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof navigateSchema.delete> = req;

        serviceResult.data = await navigateService.delete({
            navigateId: data.body.navigateId.map(navigateId => MongoDBHelpers.createObjectId(navigateId))
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};