import {Request, Response} from "express";
import V from "../library/variable"
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import {InferType} from "yup";
import authSchema from "../schemas/auth.schema";
import userService from "../services/user.service";
import {StatusId} from "../constants/status";
import logMiddleware from "../middlewares/log.middleware";

export default {
    getSession: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof authSchema.get> = req;

            if (data.query.isRefresh) {
                serviceResult.data = await userService.select({userId: req.session.data.id.toString()});
            }

            res.status(serviceResult.statusCode).json(serviceResult)
        })
    },
    login: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof authSchema.post> = req;

            let resData = await userService.select({
                ...data.body
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
                        token: V.hash((user._id.toString() + req.ip).toString(), "sha256"),
                        createAt: new Date().getTime(),
                        updatedAt: new Date().getTime()
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
        })
    },
    logOut: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            await req.session.destroy(() => {
                res.status(serviceResult.statusCode).json(serviceResult)
            });
        })
    }
};