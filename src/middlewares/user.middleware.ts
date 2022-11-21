import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import userService from "../services/user.service";
import MongoDBHelpers from "../library/mongodb/helpers";
import V from "../library/variable";
import userRoles from "../constants/userRoles";

export default {
    check: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let userId = req.params.userId;

        let resData = await userService.select({
            userId: userId
        });
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
    checkRoleRank: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let roleId = req.body.roleId;
        let userId = req.params.userId;
        let userRoleId = 0;

        if (roleId) {
            userRoleId = roleId;
        } else if (userId) {
            let resData = await userService.select({
                userId: userId
            });
            if (resData.length > 0) {
                userRoleId = resData[0].roleId;
            }
        }

        if (userRoleId > 0) {
            if (userRoles.findSingle("id", req.session.data.roleId).rank <= userRoles.findSingle("id", userRoleId).rank) {
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
    checkAlreadyEmail: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let userId = req.params.userId;
        let email = req.body.email;

        if (userId) {
            let resData = await userService.select({
                userId: userId
            });
            if (resData.length > 0) {
                if (email) {
                    if (resData[0].email == email) {
                        next();
                        return;
                    }
                }
            }
        }


        if (email) {
            let resData = await userService.select({
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
    },
    checkAndSetUrlAlready: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let url: string = req.body.url;
        let name: string = req.body.name;

        if(name) {
            let userId = req.body.userId ? req.body.userId : req.body.isProfile ? req.session.data.id : undefined;

            let urlAlreadyCount = 2;
            url = url && url.length > 0 ? url : name.convertSEOUrl();

            let oldUrl = url;
            while ((await userService.select({
                ignoreUserId: userId ? [userId] : undefined,
                url: url,
                maxCount: 1
            })).length > 0) {

                url = `${oldUrl}-${urlAlreadyCount}`;
                urlAlreadyCount++;

            }

            req.body.url = url;
        }

        next();
    },
    checkPassword: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let password = req.body.password;

        let resData = await userService.select({
            email: req.session.data.email,
            password: password
        });

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
    setIsProfile: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        req.body.isProfile = true;
        next();
    }
};