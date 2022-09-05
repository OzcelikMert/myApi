import {Request, Response} from "express";
import {ErrorCodes, Result} from "../library/api";
import {InferType} from "yup";
import V, {ClearTypes} from "../library/variable";
import postTermSchema from "../schemas/postTerm.schema";
import postTermService from "../services/postTerm.service";
import MongoDBHelpers from "../library/mongodb/helpers";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let data: InferType<typeof postTermSchema.get> = req;

        serviceResult.data = await postTermService.select({
            ...data.params,
            ...data.query,
            langId: MongoDBHelpers.createObjectId(data.query.langId),
            termId: data.params.termId ? MongoDBHelpers.createObjectId(data.params.termId) : undefined
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    getWithType: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let data: InferType<typeof postTermSchema.getWithType> = req;

        serviceResult.data = await postTermService.select({
            ...data.params,
            ...data.query,
            langId: MongoDBHelpers.createObjectId(data.query.langId)
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    add: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let data: InferType<typeof postTermSchema.post> = req;

        data.body.contents.url = (data.body.contents.url) ?? V.clear(data.body.contents.title, ClearTypes.SEO_URL);

        serviceResult.data = await postTermService.insert({
            ...data.body,
            ...data.params,
            authorId: req.session.data.id,
            mainId: data.body.mainId ? MongoDBHelpers.createObjectId(data.body.mainId) : undefined,
            contents: {
                ...data.body.contents,
                langId: MongoDBHelpers.createObjectId(data.body.langId)
            }
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postTermSchema.put> = req;

        data.body.contents.url = (data.body.contents.url) ?? V.clear(data.body.contents.title, ClearTypes.SEO_URL);

        serviceResult.data = await postTermService.update({
            ...data.body,
            ...data.params,
            termId: MongoDBHelpers.createObjectId(data.params.termId),
            lastAuthorId: req.session.data.id,
            mainId: data.body.mainId ? MongoDBHelpers.createObjectId(data.body.mainId) : undefined,
            contents: {
                ...data.body.contents,
                langId: MongoDBHelpers.createObjectId(data.body.langId)
            }
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    updateStatus: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postTermSchema.putStatus> = req;

        serviceResult.data = await postTermService.update({
            ...data.body,
            ...data.params,
            lastAuthorId: req.session.data.id,
            termId: data.body.termId.map(termId => MongoDBHelpers.createObjectId(termId))
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof postTermSchema.delete> = req;

        serviceResult.data = await postTermService.delete({
            termId: data.body.termId.map(termId => MongoDBHelpers.createObjectId(termId))
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};