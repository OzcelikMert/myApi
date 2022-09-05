import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import postService from "../services/post.service";
import MongoDBHelpers from "../library/mongodb/helpers";

export default {
    check: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let postId = req.params.postId ?? req.body.postId;
        let typeId = req.params.typeId;
        let langId = req.params.langId ?? req.body.langId;

        let resData = await postService.select({
            postId: postId,
            typeId: typeId,
            langId: MongoDBHelpers.createObjectId(langId)
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
    checkAndSetUrlAlready: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let url = req.body.url;
        let langId = req.body.langId;
        let typeId = req.params.typeId;
        let postId = req.params.postId ? MongoDBHelpers.createObjectId(req.params.postId) : undefined

        let urlAlreadyCount = 2;

        while((await postService.select({
            ignorePostId: postId ? [postId] : undefined,
            langId: MongoDBHelpers.createObjectId(langId),
            typeId: typeId,
            url: url,
            maxCount: 1
        })).length > 0) {

            url += `-${urlAlreadyCount}`;
            urlAlreadyCount++;

        }

        req.body.url = url;

        next();
    }
};