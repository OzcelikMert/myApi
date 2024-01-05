import {FastifyRequest, FastifyReply, RouteHandlerMethod} from 'fastify';
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import zod from "zod";
import authSchema from "../schemas/auth.schema";
import userService from "../services/user.service";
import {StatusId} from "../constants/status";
import logMiddleware from "../middlewares/log.middleware";
import userUtil from "../utils/user.util";

const getSession: RouteHandlerMethod = async (
    req: FastifyRequest<{Params: any, Querystring: (zod.infer<typeof authSchema.get>["query"])}>,
    reply: FastifyReply
) => {
    await logMiddleware.error(req, reply, async () => {
        let serviceResult = new Result();

        serviceResult.data = await userService.getOne({_id: req.sessionAuth.user?.userId.toString()});
        reply.status(serviceResult.statusCode).send(serviceResult)
    })
};
const login: RouteHandlerMethod = async (
    req: FastifyRequest<{Params: any, Body: (zod.infer<typeof authSchema.post>["body"])}>,
    reply: FastifyReply
) => {
    await logMiddleware.error(req, reply, async () => {
        let serviceResult = new Result();

        let resData = await userService.getOne({
            ...req.body
        });

        if(resData){
            let user = resData;
            if(user.statusId == StatusId.Active) {
                let time = new Date().getTime();
                req.session.get("foo")
                req.sessionAuth.set("user", {
                    userId: user._id,
                    email: user.email,
                    roleId: user.roleId,
                    ip: req.ip,
                    permissions: user.permissions,
                    token: userUtil.createToken(user._id.toString(), req.ip, time),
                });
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

        reply.status(serviceResult.statusCode).send(serviceResult)
    })
};
const logOut: RouteHandlerMethod = async (
    req: FastifyRequest<{Params: any}>,
    reply: FastifyReply
) => {
    await logMiddleware.error(req, reply, async () => {
        let serviceResult = new Result();

        req.sessionAuth.delete();
        reply.status(serviceResult.statusCode).send(serviceResult);
    })
};

export default {
    getSession: getSession,
    login: login,
    logOut: logOut
};