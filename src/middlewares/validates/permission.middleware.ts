import {NextFunction, Request, Response} from "express";
import {UserRoleId} from "../../public/static";
import {ErrorCodes, Result, StatusCodes} from "../../utils/service";
import {Config} from "../../config";
import PermissionPaths from "../../public/permissions/paths";
import {PermissionPathDataDocument} from "../../types/public/permissions/paths";

export default {
    check: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();
        let session = req.session.data;

        let page = req.originalUrl.replace(`/ajax`, "");
        Object.keys(PermissionPaths).forEach(key => {
            if(page.search(key) > -1){
                page = key;
            }
        })

        let method: keyof PermissionPathDataDocument = req.method.toLowerCase() as any;

        if (
            session.roleId != UserRoleId.Admin &&
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
