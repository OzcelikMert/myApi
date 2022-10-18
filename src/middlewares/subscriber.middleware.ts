import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import subscriberService from "../services/subscriber.service";

export default {
    isThere: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let email = req.body.email;

        let resData = await subscriberService.select({
            email: email
        });

        if (resData.length > 0) {
            serviceResult.status = false;
            serviceResult.errorCode = ErrorCodes.alreadyData;
            serviceResult.statusCode = StatusCodes.conflict;
        }

        if (serviceResult.status) {
            next();
        } else {
            res.status(serviceResult.statusCode).json(serviceResult)
        }
    }
};