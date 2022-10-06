import {requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import {Router} from "express";
import mailerSchema from "../../schemas/mailer.schema";
import mailerMiddleware from "../../middlewares/mailer.middleware";
import mailerController from "../../controllers/mailer.controller";

const mailerRouter = Router();

mailerRouter.route(`/`)
    .post([requestMiddleware.check(mailerSchema.post), mailerMiddleware.checkContactForm], mailerController.set)

export default mailerRouter;