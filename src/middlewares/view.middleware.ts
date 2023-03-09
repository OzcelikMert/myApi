import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import viewService from "../services/view.service";
import Variable, {DateMask} from "../library/variable";
import logMiddleware from "./log.middleware";

export default {
    checkOne: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            req.body.url = Variable.isEmpty(req.body.url) ? "/" : req.body.url;
            let url = req.body.url;

            let dateStart = new Date(new Date().getStringWithMask(DateMask.DATE)),
                dateEnd = new Date(new Date().getStringWithMask(DateMask.DATE));
            dateEnd.addDays(1);

            let resData = await viewService.getOne({
                ip: req.ip,
                url: url,
                dateStart: dateStart,
                dateEnd: dateEnd
            });

            if (resData) {
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
    checkAndDeleteMany: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let dateEnd = new Date();
            dateEnd.addDays(-7);

            let resData = await viewService.getOne({dateEnd: dateEnd});

            if (resData) {
                await viewService.deleteMany({dateEnd: dateEnd})
            }

            next();
        });
    }
};