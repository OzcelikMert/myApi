import {AnySchema} from "yup";
import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../../utils/service";

export default {
    check: (schema: AnySchema) => (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();
        try {
            let validatedData = schema.validateSync({
                body: req.body,
                query: req.query,
                params: req.params
            }, {abortEarly: false, stripUnknown: true});
            req = Object.assign(req, validatedData);
        } catch (e) {
            serviceResult.status = false;
            serviceResult.data = e.errors;
            serviceResult.errorCode = ErrorCodes.incorrectData;
            serviceResult.statusCode = StatusCodes.badRequest;
        } finally {
            if (serviceResult.status) {
                next();
            } else {
                res.status(serviceResult.statusCode).json(serviceResult)
            }
        }
    }
};
