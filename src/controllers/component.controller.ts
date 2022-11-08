import {Request, Response} from "express";
import {ErrorCodes, Result} from "../library/api";
import {InferType} from "yup";
import V, {ClearTypes} from "../library/variable";
import componentSchema from "../schemas/component.schema";
import componentService from "../services/component.service";

export default {
    get: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let data: InferType<typeof componentSchema.get> = req;

        serviceResult.data = await componentService.select({
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

        let data: InferType<typeof componentSchema.post> = req;

        await componentService.insert({
            ...data.body,
            authorId: req.session.data.id.toString(),
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    update: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof componentSchema.put> = req;

        await componentService.update({
            ...data.params,
            ...data.body,
            lastAuthorId: req.session.data.id.toString()
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    delete: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof componentSchema.delete> = req;

        await componentService.delete({
            ...data.body
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};