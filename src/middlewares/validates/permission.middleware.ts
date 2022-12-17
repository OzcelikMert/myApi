import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../../library/api";
import permissionUtil from "../../utils/permission.util";
import logMiddleware from "../log.middleware";

export default {
    check: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let session = req.session.data;

            let path = req.originalUrl.replace(`/api`, "");

            if (!permissionUtil.checkPermissionPath(
                path,
                req.method,
                session.roleId,
                session.permission
            )) {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.noPerm;
                serviceResult.statusCode = StatusCodes.notFound;
            }

            if (serviceResult.status) {
                next();
            } else {
                res.status(serviceResult.statusCode).json(serviceResult)
            }
        });
    }
};
