import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../../library/api";
import {UserRoleId} from "../../constants/userRoles";
import permissionUtil from "../../utils/functions/permission.util";

export default {
    check: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
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
    }
};
