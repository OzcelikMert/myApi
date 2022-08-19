import {Request, Response, NextFunction} from "express";
import V from "../../library/variable"
import {ErrorCodes, Result, StatusCodes} from "../../utils/service";

export default {
    check: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();
        if (!req.session || !req.session.data || req.session.data.id <= 0) {
            serviceResult.status = false;
            serviceResult.errorCode = ErrorCodes.notLoggedIn;
            serviceResult.statusCode = StatusCodes.unauthorized;
        }

        if (serviceResult.status) {
            next();
        } else {
            res.status(serviceResult.statusCode).json(serviceResult)
        }
    }
};
