import {FastifyRequest, FastifyReply} from "fastify";
import {ErrorCodes, Result, StatusCodes} from "../../library/api";
import userService from "../../services/user.service";
import {StatusId} from "../../constants/status";
import {sessionTTL} from "../../config/session";
import logMiddleware from "../log.middleware";

export default {
    check: async (
        req: FastifyRequest,
        res: FastifyReply
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            if (req.session && req.session.data) {
                if (req.sessionAuth.get("ip") != req.ip) {
                    await new Promise(resolve => {
                        req.sessionAuth.delete();
                        resolve();
                    })
                }
            }

            if (
                (typeof req.session === "undefined" || typeof req.session.data === "undefined") ||
                !(await userService.getOne({_id: req.sessionAuth.get("_id"), statusId: StatusId.Active}))
            ) {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.notLoggedIn;
                serviceResult.statusCode = StatusCodes.unauthorized;
            }

            if (serviceResult.status) {
                return;
            } else {
                res.status(serviceResult.statusCode).send(serviceResult)
            }
        });
    },
    reload: async (
        req: FastifyRequest,
        res: FastifyReply
    ) => {
        await logMiddleware.error(req, res, async () => {
            if (req.session && req.session.data) {
                if (Number(new Date().diffSeconds(new Date(req.session.data.updatedAt))) > sessionTTL) {
                    await new Promise(resolve => {
                        req.sessionAuth.delete();
                        resolve();
                    })
                }
            }
            if (req.session && req.session.data) {
                req.session.data.updatedAt = Date.now();
            }
        });
    }
};
