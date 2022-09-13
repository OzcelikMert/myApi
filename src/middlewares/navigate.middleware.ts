import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import navigateService from "../services/navigate.service";
import MongoDBHelpers from "../library/mongodb/helpers";

export default {
    check: async (
        req: Request<any, any, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let navigateId = req.params.navigateId ?? req.body.navigateId;
        let langId = req.query.langId ?? req.body.contents.langId;

        let resData = await navigateService.select({
            navigateId: MongoDBHelpers.createObjectId(navigateId),
            langId: MongoDBHelpers.createObjectId(langId)
        });

        if (
            resData.length === 0 ||
            (Array.isArray(navigateId) && resData.length != navigateId.length)
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
    }
};