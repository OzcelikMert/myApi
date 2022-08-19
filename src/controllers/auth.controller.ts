import {Request, Response} from "express";
import V from "../library/variable"
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import {InferType} from "yup";
import authSchema from "../schemas/auth.schema";
import userService from "../services/user.service";
import {StatusId} from "../public/static";

export default {
    getSession: (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof authSchema.get> = req;

        if (data.query.isRefresh) {
            serviceResult.data = userService.select({userId: req.session.data.id});
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    login: (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof authSchema.post> = req;

        let resData = userService.select(data.body);

        if(resData.length > 0){
            let user = resData[0];
            if(user.userStatusId == StatusId.Active) {
                req.session.data = {
                    id: user.userId,
                    email: user.userEmail,
                    roleId: user.userRoleId,
                    ip: req.ip,
                    permission: [],
                    token: V.hash((user.userId + req.ip).toString(), "sha256")
                }
                req.session.save();
            }else {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.noPerm;
                serviceResult.statusCode = StatusCodes.notFound;
            }
            serviceResult.data = resData;

            if(user.userStatusId != StatusId.Active && user.userStatusId != StatusId.Banned){
                serviceResult.data = [];
            }
        }else {
            serviceResult.status = false;
            serviceResult.errorCode = ErrorCodes.notFound;
            serviceResult.statusCode = StatusCodes.notFound;
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    logOut: (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();

        req.session.destroy(() => {
            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};