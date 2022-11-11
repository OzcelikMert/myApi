import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import componentService from "../services/component.service";

export default {
    check: async (
        req: Request<any, any, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let componentId = req.params.componentId ?? req.body.componentId;

        let resData = await componentService.select({componentId: componentId});

        if (
            resData.length === 0 ||
            (Array.isArray(componentId) && resData.length != componentId.length)
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