import {NextFunction, Request, Response} from "express";
import {UserRoles} from "../public/static";
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import userService from "../services/user.service";
import MongoDBHelpers from "../library/mongodb/helpers";
import V, {ClearTypes} from "../library/variable";

export default {
    check: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let userId = req.params.userId;

        let resData = await userService.select({userId: MongoDBHelpers.createObjectId(userId)});
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
            let resData = await userService.select({userId: MongoDBHelpers.createObjectId(userId)});
            if (resData.length > 0) {
                userRoleId = resData[0].roleId;
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
    checkAlreadyEmail: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let userId = req.params.userId;
        let email = req.body.email;

        if(userId){
            let resData = await userService.select({userId: MongoDBHelpers.createObjectId(userId)});
            if (resData.length > 0) {
                if (email) {
                    if(resData[0].email == email) {
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
        let url = (req.body.url) ?? V.clear(req.body.name, ClearTypes.SEO_URL);
        let userId = req.body.userId
            ? MongoDBHelpers.createObjectId(req.body.userId)
            :  req.body.isProfile
                ? req.session.data.id
                : undefined;

        let urlAlreadyCount = 2;

        while((await userService.select({
            ignoreUserId: userId ? [userId] : undefined,
            url: url,
            maxCount: 1
        })).length > 0) {

            url += `-${urlAlreadyCount}`;
            urlAlreadyCount++;

        }

        req.body.url = url;

        next();
    }
};