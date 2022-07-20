import {NextFunction, Request, Response} from "express";
import {UserRoles} from "../public/static";
import {ErrorCodes, ServiceResult, StatusCodes} from "../utils/ajax";
import userService from "../services/user.service";

export default {
    check: (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new ServiceResult();

        let userId = req.params.userId;

        let resData = userService.select({userId: userId});
        if (resData.length === 0) {
            serviceResult.status = false;
            serviceResult.errorCode = ErrorCodes.notFound;
            serviceResult.statusCode = StatusCodes.notFound;
        }

        if (serviceResult.status) {
            next();
        } else {
            res.status(serviceResult.statusCode).json(serviceResult)
        }
    },
    checkRoleRank: (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new ServiceResult();

        let roleId = req.body.roleId;
        let userId = req.params.userId;
        let userRoleId = 0;

        if (roleId) {
            userRoleId = roleId;
        } else if (userId) {
            let resData = userService.select({userId: userId});
            if (resData.length > 0) {
                userRoleId = resData[0].userRoleId;
            }
        }

        if (userRoleId > 0) {
            if (UserRoles.findSingle("id", req.session.data.roleId).rank < UserRoles.findSingle("id", userRoleId).rank) {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.noPerm;
                serviceResult.statusCode = StatusCodes.notFound;
            }
        }

        if (serviceResult.status) {
            next();
        } else {
            res.status(serviceResult.statusCode).json(serviceResult)
        }
    },
    checkAlreadyEmail: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new ServiceResult();

        let email = req.body.email;

        if (email) {
            let resData = userService.select({
                email: email
            });

            if (resData.length > 0) {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.alreadyData;
                serviceResult.statusCode = StatusCodes.conflict;
            }
        }

        if (serviceResult.status) {
            next();
        } else {
            res.status(serviceResult.statusCode).json(serviceResult)
        }
    }
};