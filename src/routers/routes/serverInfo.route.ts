import { FastifyInstance } from 'fastify';
import serverInfoController from "../../controllers/serverInfo.controller";
import sessionMiddleware from "../../middlewares/validates/session.middleware";
import permissionMiddleware from "../../middlewares/validates/permission.middleware";

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
    fastify.get('/get', { preHandler: [sessionMiddleware.check, permissionMiddleware.check] }, serverInfoController.get);
    done();
}