import {NextFunction, Request, Response} from "express";
import {ErrorCodes, ServiceResult, StatusCodes} from "../utils/ajax";
import postTermService from "../services/postTerm.service";

export default {
    check: (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new ServiceResult();

        let termId = req.params.termId;
        termId = termId ? termId : req.body.termId;
        let typeId = req.params.typeId;
        let postTypeId = req.params.postTypeId;

        let resData = postTermService.select({
            termId: termId,
            postTypeId: postTypeId,
            typeId: typeId,
            langId: 1
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
    checkUrlAlready: (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new ServiceResult();

        let url = req.body.url;
        let typeId = req.params.typeId;
        let postTypeId = req.params.postTypeId;
        let langId = req.body.langId;

        let urlAlreadyCount = 2;

        while(postTermService.select({postTypeId: postTypeId, typeId: typeId, langId: langId, url: url}).length > 0) {
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