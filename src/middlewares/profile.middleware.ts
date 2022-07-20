import {NextFunction, Request, Response} from "express";
import {ErrorCodes, ServiceResult, StatusCodes} from "../utils/ajax";
import userService from "../services/user.service";

export default {
    checkPassword: (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new ServiceResult();

        let password = req.body.password;

        let resData = userService.select({
            email: req.session.data.email,
            password: password
        });

        if (resData.length === 0) {
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