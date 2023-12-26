import { FastifyRequest, FastifyReply } from 'fastify';
import {ErrorCodes, Result, StatusCodes} from "../../library/api";
import permissionUtil from "../../utils/permission.util";
import logMiddleware from "../log.middleware";
import {SessionAuthDocument} from "../../types/models/sessionAuth";

export default {
    check: async (
        req: FastifyRequest,
        reply: FastifyReply
    ) => {
        await logMiddleware.error(req, reply, async () => {
            let serviceResult = new Result();
            let session = req.sessionAuth as SessionAuthDocument;

            let path = req.originalUrl.replace(`/api`, "");

            if (!permissionUtil.checkPermissionPath(
                path,
                req.method,
                session.roleId,
                session.permissions
            )) {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.noPerm;
                serviceResult.statusCode = StatusCodes.notFound;
            }

            if (!serviceResult.status) {
                reply.status(serviceResult.statusCode).send(serviceResult)
            }
        });
    }
};
