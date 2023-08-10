import {Request, Response, NextFunction} from "express";
import {ErrorCodes, Result, StatusCodes} from "../../library/api";
import userService from "../../services/user.service";
import {StatusId} from "../../constants/status";
import {sessionTTL} from "../../config/session";
import logMiddleware from "../log.middleware";

export default {
    check: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
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
                (typeof req.session === "undefined" || typeof req.session.data === "undefined") ||
                !(await userService.getOne({_id: req.session.data.id.toString(), statusId: StatusId.Active}))
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
        });
    },
    reload: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            if (req.session && req.session.data) {
                if (Number(new Date().diffSeconds(new Date(req.session.data.updatedAt))) > sessionTTL) {
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
        });
    }
};
