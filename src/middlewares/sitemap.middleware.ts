import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import viewService from "../services/view.service";
import {DateMask} from "../library/variable";
import * as fs from "fs";
import * as path from "path";
import SitemapFolderPaths from "../library/sitemap/paths";

export default {
    check: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
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
    },
};