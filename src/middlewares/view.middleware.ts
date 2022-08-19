import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import viewService from "../services/view.service";
import {DateMask} from "../library/variable";

export default {
    check: (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let url = req.body.url;

        let resData = viewService.select({
            ip: req.ip,
            url: url,
            date: new Date().getStringWithMask(DateMask.DATE)
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
    delete: (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let dateEnd = new Date();
        dateEnd.addDays(-7);
        let dateEndString = dateEnd.toLocaleString();

        let resData = viewService.selectTotal({dateEnd: dateEndString});

        if (resData.length > 0 && resData[0].total > 0) {
            viewService.delete({dateEnd: dateEndString})
        }

        next();
    }
};