import {NextFunction, Request, Response} from "express";
import {ErrorCodes, ServiceResult, StatusCodes} from "../utils/ajax";
import navigateService from "../services/navigate.service";

export default {
    check: (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new ServiceResult();

        let navigateId = req.params.navigateId;
        navigateId = navigateId ? navigateId : req.body.navigateId;


        let resData = navigateService.select({
            navigateId: navigateId,
            langId: 1
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