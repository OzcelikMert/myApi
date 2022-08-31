import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import postTermService from "../services/postTerm.service";
import MongoDBHelpers from "../library/mongodb/helpers";

export default {
    check: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let termId = req.params.termId ?? req.body.termId;
        let typeId = req.params.typeId;
        let postTypeId = req.params.postTypeId;
        let langId = req.params.langId ?? req.body.langId;

        let resData = await postTermService.select({
            termId: termId,
            postTypeId: postTypeId,
            typeId: typeId,
            langId: MongoDBHelpers.createObjectId(langId)
        });

        if (
            resData.length === 0 ||
            (Array.isArray(termId) && resData.length != termId.length)
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
    },
    checkUrlAlready: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let url = req.body.url;
        let typeId = req.params.typeId;
        let postTypeId = req.params.postTypeId;
        let langId = req.body.langId;

        let urlAlreadyCount = 2;

        while((await postTermService.select({postTypeId: postTypeId, typeId: typeId, langId: MongoDBHelpers.createObjectId(langId), url: url})).length > 0) {
            url += `-${urlAlreadyCount}`;
            urlAlreadyCount++;
        }

        req.body.url = url;

        if (serviceResult.status) {
            next();
        } else {
            res.status(serviceResult.statusCode).json(serviceResult)
        }
    }
};