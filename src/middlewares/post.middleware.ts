import {NextFunction, Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import postService from "../services/post.service";

export default {
    check: async (
        req: Request<any, any, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        let serviceResult = new Result();

        let postId = req.params.postId ?? req.body.postId;
        let typeId = req.params.typeId;
        let langId = req.query.langId ?? req.body.contents.langId;

        let resData = await postService.select({
            postId: postId,
            typeId: typeId,
            langId: langId
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
        let typeId: number = req.params.typeId;
        let postId: string = req.params.postId ?? req.body.postId;

        let url: string = req.body.contents.url;
        let title: string = req.body.contents.title;
        let langId: string = req.body.contents.langId;

        let urlAlreadyCount = 2;
        url = url && url.length > 0 ? url : title.convertSEOUrl();

        let oldUrl = url;
        while((await postService.select({
            ignorePostId: postId ? [postId] : undefined,
            langId: langId,
            typeId: typeId,
            url: url,
            maxCount: 1
        })).length > 0) {

            url = `${oldUrl}-${urlAlreadyCount}`;
            urlAlreadyCount++;

        }

        req.body.contents.url = url;

        next();
    }
};