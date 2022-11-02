import {Request, Response} from "express";
import {ErrorCodes, Result} from "../library/api";
import fs from "fs";
import config from "config";

const serverProtocol = config.get("serverProtocol") as string;
const serverHost = config.get("serverHost") as string;

export default {
    get: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        res.status(serviceResult.statusCode).json(serviceResult)
    },
};