import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import userService from "../services/user.service";
import UserRoles from "../constants/userRoles";
import logMiddleware from "./log.middleware";

export default {
    checkOne: async (
        req: Request<any, any, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let _id = req.params._id as string;

            let resData = await userService.getOne({
                _id: _id
            });

            if (!resData) {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.notFound;
                serviceResult.statusCode = StatusCodes.notFound;
            }

            if (serviceResult.status) {
                next();
            } else {
                res.status(serviceResult.statusCode).json(serviceResult)
            }
        });
    },
    checkMany: async (
        req: Request<any, any, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let _id = req.body._id as string[];

            let resData = await userService.getMany({
                _id: _id
            });

            if (
                resData.length == 0 ||
                (resData.length != _id.length)
            ) {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.notFound;
                serviceResult.statusCode = StatusCodes.notFound;
            }

            if (serviceResult.status) {
                next();
            } else {
                res.status(serviceResult.statusCode).json(serviceResult)
            }
        });
    },
    checkOneRoleRank: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let roleId = req.body.roleId;
            let _id = req.params._id as string;
            let userRoleId = 0;

            if (roleId) {
                userRoleId = roleId;
            } else if (_id) {
                let resData = await userService.getOne({
                    _id: _id
                });
                if (resData) {
                    userRoleId = resData.roleId;
                }
            }

            if (userRoleId > 0) {
                let sessionUserRole = UserRoles.findSingle("id", req.session.data.roleId);
                let userRole = UserRoles.findSingle("id", userRoleId);

                if(
                    (typeof sessionUserRole === "undefined" || typeof userRole === "undefined") ||
                    (userRole.rank >= sessionUserRole.rank)
                ){
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
        });
    },
    checkAlreadyEmail: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let _id = req.params._id as string;
            let email = req.body.email as string;

            if (email) {
                let resData = await userService.getOne({
                    email: email,
                    ignoreUserId: _id ? [_id] : undefined
                });

                if (resData) {
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
        });
    },
    checkUrl: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let name = req.body.name as string;

            if(name) {
                let _id: string | undefined = req.body._id ?? req.params._id ?? req.body.isProfile ? req.session.data.id.toString() : undefined;

                let urlAlreadyCount = 2;
                let url = name.convertSEOUrl();

                let oldUrl = url;
                while ((await userService.getOne({
                    ignoreUserId: _id ? [_id] : undefined,
                    url: url
                }))) {

                    url = `${oldUrl}-${urlAlreadyCount}`;
                    urlAlreadyCount++;

                }

                req.body.url = url;
            }

            next();
        });
    },
    checkPasswordWithSessionEmail: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let password = req.body.password;

            let resData = await userService.getOne({
                email: req.session.data.email,
                password: password
            });

            if (!resData) {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.notFound;
                serviceResult.statusCode = StatusCodes.notFound;
            }

            if (serviceResult.status) {
                next();
            } else {
                res.status(serviceResult.statusCode).json(serviceResult)
            }
        });
    },
    setIsProfile: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            req.body.isProfile = true;
            next();
        });
    }
};