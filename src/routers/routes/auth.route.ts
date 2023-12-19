import authSchema from "../../schemas/auth.schema";
import authController from "../../controllers/auth.controller";
import { FastifyInstance } from 'fastify';
import requestMiddleware from "../../middlewares/validates/request.middleware";
import sessionMiddleware from "../../middlewares/validates/session.middleware";

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
    fastify.get('/get', { preHandler: [requestMiddleware.check(authSchema.get), sessionMiddleware.check] }, authController.getSession);
    fastify.post('/login', { preHandler: [requestMiddleware.check(authSchema.post)] }, authController.login);
    fastify.delete('/logout', { preHandler: [sessionMiddleware.check] }, authController.logOut);
    done();
}