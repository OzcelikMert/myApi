import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import * as fs from "fs";
import * as path from "path";
import SitemapFolderPaths from "../library/sitemap/paths";
import logMiddleware from "./log.middleware";

export default {
    check: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let name = req.params.name;

            serviceResult.status = fs.existsSync(path.resolve(SitemapFolderPaths.main, `${name}.json`));

            if (!serviceResult.status) {
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
};