import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import postTermService from "../services/postTerm.service";
import logMiddleware from "./log.middleware";

export default {
    checkOne: async (
        req: Request<any, any, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let _id = req.params._id as string;
            let typeId = req.params.typeId as number;
            let postTypeId = req.params.postTypeId as number;

            let resData = await postTermService.getOne({
                _id: _id,
                postTypeId: postTypeId,
                typeId: typeId,
            });

            if (!resData) {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.notFound;
                serviceResult.statusCode = StatusCodes.notFound;
            }

            if (serviceResult.status) {
                next();
            } else {
                res.status(serviceResult.statusCode).json(serviceResult)
            }
        });
    },
    checkMany: async (
        req: Request<any, any, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let _id = req.body._id as string[];
            let typeId = req.params.typeId as number;
            let postTypeId = req.params.postTypeId as number;

            let resData = await postTermService.getMany({
                _id: _id,
                postTypeId: postTypeId,
                typeId: [typeId],
            });

            if (
                resData.length === 0 ||
                (resData.length != _id.length)
            ) {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.notFound;
                serviceResult.statusCode = StatusCodes.notFound;
            }

            if (serviceResult.status) {
                next();
            } else {
                res.status(serviceResult.statusCode).json(serviceResult)
            }
        });
    },
    checkUrl: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let _id = req.params._id as string | undefined;
            let typeId = req.params.typeId as number;
            let postTypeId = req.params.postTypeId as number;

            if(req.body.contents){
                let url: string = req.body.contents.url;
                let title: string = req.body.contents.title || "";

                let urlAlreadyCount = 2;
                url = url && url.length > 0 ? url : title.convertSEOUrl();

                let oldUrl = url;
                while((await postTermService.getOne({
                    ignoreTermId: _id ? [_id] : undefined,
                    typeId: typeId,
                    postTypeId: postTypeId,
                    url: url
                }))) {
                    url = `${oldUrl}-${urlAlreadyCount}`;
                    urlAlreadyCount++;
                }

                req.body.contents.url = url;
            }

            next();
        });
    }
};