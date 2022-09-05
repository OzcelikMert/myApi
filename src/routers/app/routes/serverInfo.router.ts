import {permissionMiddleware, sessionMiddleware} from "../../../middlewares/validates";
import {Router} from "express";
import serverInfoController from "../../../controllers/serverInfo.controller";

const serverInfoRouter = Router();

serverInfoRouter.route(`/`)
    .get([sessionMiddleware.check, permissionMiddleware.check], serverInfoController.get)

export default serverInfoRouter;