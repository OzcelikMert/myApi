import {Request, Response, NextFunction} from "express";
import V from "../../library/variable"
import {ErrorCodes, Result, StatusCodes} from "../../library/api";
import userService from "../../services/user.service";
import {StatusId} from "../../constants/status";

export default {
    check: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();
        if (
            (!req.session || !req.session.data) ||
            (await userService.select({userId: req.session.data.id.toString(), statusId: StatusId.Active})).length === 0
        ) {
            serviceResult.status = false;
            serviceResult.errorCode = ErrorCodes.notLoggedIn;
            serviceResult.statusCode = StatusCodes.unauthorized;
        }

        if (serviceResult.status) {
            req.session.reload( err => {
                next();
            })
        } else {
            res.status(serviceResult.statusCode).json(serviceResult)
        }
    }
};
