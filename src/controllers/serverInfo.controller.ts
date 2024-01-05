import {FastifyRequest, FastifyReply, RouteHandlerMethod} from 'fastify';
import {Result} from "../library/api";
import osu from "node-os-utils";
import checkDiskSpace from "check-disk-space";
import os from "os";
import {Config} from "../config";
import logMiddleware from "../middlewares/log.middleware";
import {FastifyRequestHandler} from "../types/fastify";
import zod from "zod";
import authSchema from "../schemas/auth.schema";
import {AuthSchemaPostBody} from "../types/schemas/auth.schema";

const get: FastifyRequestHandler<{Params: AuthSchemaPostBody}> = async (req, reply) => {
    req.params.email;
    //return await logMiddleware.error(req, reply, async () => {
        let serviceResult = new Result();
        let cpu = await osu.cpu.usage();
        let diskSpace = await checkDiskSpace(Config.paths.root);

        serviceResult.data = {
            cpu: cpu.toFixed(2),
            memory: (100 - (100 / os.totalmem()) * os.freemem()).toFixed(2),
            storage: (100 - ((diskSpace.free * 100) / diskSpace.size)).toFixed(2)
        }

        reply.status(serviceResult.statusCode).send(serviceResult)
   // });
}

export default {
    get: get
};