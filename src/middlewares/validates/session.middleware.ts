import {Request, Response, NextFunction} from "express";
import V from "../../library/variable"
import {ErrorCodes, Result, StatusCodes} from "../../library/api";
import userService from "../../services/user.service";
import {StatusId} from "../../constants/status";
import {sessionTTL} from "../../config/session";

export default {
    check: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        if (req.session && req.session.data) {
            if (req.session.data.ip != req.ip) {
                await new Promise(resolve => {
                    req.session.destroy(async err => {
                        resolve(err)
                    });
                })
            }
        }

        if (
            (!req.session || !req.session.data) ||
            (await userService.select({userId: req.session.data.id.toString(), statusId: StatusId.Active})).length === 0
        ) {
            serviceResult.status = false;
            serviceResult.errorCode = ErrorCodes.notLoggedIn;
            serviceResult.statusCode = StatusCodes.unauthorized;
        }

        if (serviceResult.status) {
            next();
        } else {
            res.status(serviceResult.statusCode).json(serviceResult)
        }
    },
    reload: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (req.session && req.session.data) {
            console.log(new Date(req.session.data.updatedAt + (sessionTTL * 1000)), new Date(), new Date().diffSeconds(new Date(req.session.data.updatedAt + (sessionTTL * 1000))))
            if (new Date().diffSeconds(new Date(req.session.data.updatedAt + (sessionTTL * 1000))) < 0) {
                await new Promise(resolve => {
                    req.session.destroy(async err => {
                        resolve(err)
                    });
                })
            }
        }

        if (req.session && req.session.data) {
            req.session.data.updatedAt = Date.now();
        }

        next();
    }
};
