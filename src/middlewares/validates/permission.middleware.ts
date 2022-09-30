import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../../library/api";
import {Config} from "../../config";
import PermissionPaths from "../../constants/permissions/path.const";
import {PermissionPathDataDocument} from "../../types/constants/permissions/paths";
import {UserRoleId} from "../../constants/userRole.const";

export default {
    check: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();
        let session = req.session.data;

        let page = req.originalUrl.replace(`/api`, "");
        Object.keys(PermissionPaths).forEach(key => {
            if(page.search(key) > -1){
                page = key;
            }
        })

        let method: keyof PermissionPathDataDocument = req.method.toLowerCase() as any;

        if (
            session.roleId != UserRoleId.SuperAdmin &&
            PermissionPaths[page] &&
            PermissionPaths[page][method] &&
            session.permission.indexOfKey("", PermissionPaths[page][method]) === -1
        ) {
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
