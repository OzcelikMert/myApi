import { FastifyInstance } from 'fastify';
import subscriberSchema from "../../schemas/subscriber.schema";
import subscriberController from "../../controllers/subscriber.controller";
import subscriberMiddleware from "../../middlewares/subscriber.middleware";
import requestMiddleware from "../../middlewares/validates/request.middleware";
import sessionMiddleware from "../../middlewares/validates/session.middleware";
import permissionMiddleware from "../../middlewares/validates/permission.middleware";

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
    fastify.get('/get', { preHandler: [requestMiddleware.check(subscriberSchema.getMany), sessionMiddleware.check, permissionMiddleware.check] }, subscriberController.getMany);
    fastify.get('/get/:_id', { preHandler: [requestMiddleware.check(subscriberSchema.getOne), sessionMiddleware.check, permissionMiddleware.check] }, subscriberController.getOne);
    fastify.post('/add', { preHandler: [requestMiddleware.check(subscriberSchema.post), subscriberMiddleware.checkOne] }, subscriberController.add);
    fastify.delete('/delete', { preHandler: [requestMiddleware.check(subscriberSchema.deleteMany), sessionMiddleware.check, permissionMiddleware.check, subscriberMiddleware.checkMany] }, subscriberController.deleteMany);
    fastify.delete('/delete/:_id', { preHandler: [requestMiddleware.check(subscriberSchema.deleteOne), subscriberMiddleware.checkOne] }, subscriberController.deleteOne);
    done();
}