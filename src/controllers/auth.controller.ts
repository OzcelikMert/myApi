import {Request, Response} from "express";
import V from "../library/variable"
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import {InferType} from "yup";
import authSchema from "../schemas/auth.schema";
import userService from "../services/user.service";
import {StatusId} from "../public/static";
import userUtil from "../utils/functions/user.util";

export default {
    getSession: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof authSchema.get> = req;

        if (data.query.isRefresh) {
            serviceResult.data = await userService.select({userId: req.session.data.id});
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    login: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof authSchema.post> = req;

        let resData = await userService.select({
            ...data.body,
            password: data.body.password ? userUtil.encodePassword(data.body.password) : undefined
        });

        if(resData.length > 0){
            let user = resData[0];
            if(user.statusId == StatusId.Active) {
                req.session.data = {
                    id: user._id,
                    email: user.email,
                    roleId: user.roleId,
                    ip: req.ip,
                    permission: user.permissions,
                    token: V.hash((user._id.toString() + req.ip).toString(), "sha256")
                }
                req.session.save();
            }else {
                serviceResult.status = false;
                serviceResult.errorCode = ErrorCodes.noPerm;
                serviceResult.statusCode = StatusCodes.notFound;
            }
            serviceResult.data = resData;
        }else {
            serviceResult.status = false;
            serviceResult.errorCode = ErrorCodes.notFound;
            serviceResult.statusCode = StatusCodes.notFound;
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    logOut: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();

        await req.session.destroy(() => {
            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};