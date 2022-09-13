import {permissionMiddleware, requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import {Router} from "express";
import languageSchema from "../../schemas/language.schema";
import languageController from "../../controllers/language.controller";

const languageRouter = Router();

languageRouter.route(`/`)
    .get([requestMiddleware.check(languageSchema.get)], languageController.get)

export default languageRouter;