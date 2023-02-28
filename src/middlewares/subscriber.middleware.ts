import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import subscriberService from "../services/subscriber.service";
import logMiddleware from "./log.middleware";

export default {
    checkOneWithEmail: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let email = (req.body.email ?? req.params.email ?? "") as string;

            let resData = await subscriberService.getOneWithEmail({
                email: email
            });

            if (!resData) {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.alreadyData;
                serviceResult.statusCode = StatusCodes.conflict;
            }

            if (serviceResult.status) {
                next();
            } else {
                res.status(serviceResult.statusCode).json(serviceResult)
            }
        });
    },
    checkMany: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let _id = req.body._id as string[];

            let resData = await subscriberService.getMany({
                _id: _id
            });

            if (
                resData.length == 0 ||
                (resData.length != _id.length)
            ) {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.alreadyData;
                serviceResult.statusCode = StatusCodes.conflict;
            }

            if (serviceResult.status) {
                next();
            } else {
                res.status(serviceResult.statusCode).json(serviceResult)
            }
        });
    }
};