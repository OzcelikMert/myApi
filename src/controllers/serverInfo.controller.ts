import {Request, Response} from "express";
import {ErrorCodes, ServiceResult, StatusCodes} from "../utils/ajax";
import osu from "node-os-utils";
import checkDiskSpace from "check-disk-space";
import os from "os";
import {Config} from "../config";

export default {
    get: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new ServiceResult();

        let cpu = await osu.cpu.usage();
        let diskSpace = await checkDiskSpace(Config.paths.root);

        serviceResult.data = {
            cpu: cpu.toFixed(2),
            memory: (100 - (100/os.totalmem()) * os.freemem()).toFixed(2),
            storage: (100 - ((diskSpace.free * 100) / diskSpace.size)).toFixed(2)
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
};