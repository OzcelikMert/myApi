import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import viewService from "../services/view.service";
import {DateMask} from "../library/variable";

export default {
    check: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let url = req.body.url;

        let resData = await viewService.select({
            ip: req.ip,
            url: url,
            date: new Date()
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
    },
    delete: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let dateEnd = new Date();
        dateEnd.addDays(-7);

        let resData = await viewService.selectTotal({dateEnd: dateEnd});

        if (resData.total > 0) {
            viewService.delete({dateEnd: dateEnd})
        }
        
        next();
    }
};