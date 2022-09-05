import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import userService from "../services/user.service";

export default {
    checkPassword: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let password = req.body.password;

        let resData = await userService.select({
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
    },
    setIsProfile: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        req.body.isProfile = true;

        next();
    }
};