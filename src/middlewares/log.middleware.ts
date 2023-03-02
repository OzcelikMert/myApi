import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import logService from "../services/log.service";

export default {
    error: async (
        req: Request,
        res: Response,
        func: () => void
    ) => {
        try {
            await func();
        }catch (e: any) {
            console.log(e);
            await logService.add({
                url: req.originalUrl,
                ip: req.ip,
                method: req.method,
                message: JSON.stringify({error: e}),
                params: req.params,
                query: req.query,
                body: req.body,
                ...(req.session.data && req.session.data.id ? {userId: req.session.data.id.toString()} : {})
            })
            let serviceResult = new Result();
            serviceResult.statusCode = StatusCodes.badRequest;
            serviceResult.errorCode = ErrorCodes.incorrectData;
            serviceResult.status = false;
            res.status(serviceResult.statusCode).json(serviceResult)
        }
    }
}