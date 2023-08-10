import {Router} from "express";
import serverInfoController from "../../controllers/serverInfo.controller";
import sessionMiddleware from "../../middlewares/validates/session.middleware";
import permissionMiddleware from "../../middlewares/validates/permission.middleware";

const serverInfoRouter = Router();

serverInfoRouter.route(`/`)
    .get([sessionMiddleware.check, permissionMiddleware.check], serverInfoController.get)

export default serverInfoRouter;