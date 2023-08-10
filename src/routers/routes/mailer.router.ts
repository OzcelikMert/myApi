import {Router} from "express";
import mailerSchema from "../../schemas/mailer.schema";
import mailerMiddleware from "../../middlewares/mailer.middleware";
import mailerController from "../../controllers/mailer.controller";
import requestMiddleware from "../../middlewares/validates/request.middleware";

const mailerRouter = Router();

mailerRouter.route(`/`)
    .post([requestMiddleware.check(mailerSchema.post), mailerMiddleware.checkContactForm], mailerController.set)

export default mailerRouter;