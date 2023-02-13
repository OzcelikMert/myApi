import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import postTermService from "../services/postTerm.service";
import logMiddleware from "./log.middleware";

export default {
    check: async (
        req: Request<any, any, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let _id = req.params._id ?? req.body._id;
            let typeId = req.params.typeId;
            let postTypeId = req.params.postTypeId;
            let langId = req.query.langId ?? req.body.contents ? req.body.contents.langId : undefined;

            let resData = await postTermService.select({
                _id: _id,
                postTypeId: postTypeId,
                typeId: typeId,
                langId: langId
            });

            if (
                resData.length === 0 ||
                (Array.isArray(_id) && resData.length != _id.length)
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
    checkAndSetUrlAlready: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let typeId = req.params.typeId;
            let postTypeId = req.params.postTypeId;
            let _id = req.params._id ?? req.body._id

            let url: string = req.body.contents.url;
            let title: string = req.body.contents.title || "";
            let langId: string = req.body.contents.langId;

            let urlAlreadyCount = 2;
            url = url && url.length > 0 ? url : title.convertSEOUrl();

            let oldUrl = url;
            while((await postTermService.select({
                ignoreTermId: _id ? [_id] : undefined,
                postTypeId: postTypeId,
                typeId: typeId,
                langId: langId,
                url: url,
                count: 1
            })).length > 0) {

                url = `${oldUrl}-${urlAlreadyCount}`;
                urlAlreadyCount++;

            }

            req.body.contents.url = url;

            next();
        });
    }
};