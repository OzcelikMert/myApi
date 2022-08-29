import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import postService from "../services/post.service";

export default {
    check: (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let postId = req.params.postId;
        postId = postId ? postId : req.body.postId;
        let typeId = req.params.typeId;


        let resData = postService.select({
            postId: postId,
            typeId: typeId,
            langId: 1
        });

        if (
            resData.length === 0 ||
            (Array.isArray(postId) && resData.length != postId.length)
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
    },
    checkUrlAlready: (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let url = req.body.url;
        let langId = req.body.langId;
        let typeId = req.params.typeId;

        let urlAlreadyCount = 2;

        while(postService.select({langId: langId, typeId: typeId, url: url}).length > 0) {
            url += `-${urlAlreadyCount}`;
            urlAlreadyCount++;
        }

        req.body.url = url;

        if (serviceResult.status) {
            next();
        } else {
            res.status(serviceResult.statusCode).json(serviceResult)
        }
    }
};