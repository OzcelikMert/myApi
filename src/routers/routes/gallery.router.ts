import {Router} from "express";
import galleryController from "../../controllers/gallery.controller";
import gallerySchema from "../../schemas/gallery.schema";
import sessionMiddleware from "../../middlewares/validates/session.middleware";
import permissionMiddleware from "../../middlewares/validates/permission.middleware";
import requestMiddleware from "../../middlewares/validates/request.middleware";

const galleryRouter = Router();

galleryRouter.route(`/`)
    .get([sessionMiddleware.check], galleryController.get)
    .post([sessionMiddleware.check, permissionMiddleware.check], galleryController.add)
    .delete([requestMiddleware.check(gallerySchema.delete), sessionMiddleware.check, permissionMiddleware.check], galleryController.delete)

export default galleryRouter;