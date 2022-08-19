import {permissionMiddleware, requestMiddleware, sessionMiddleware} from "../../middlewares/validates";
import {Router} from "express";
import galleryController from "../../controllers/gallery.controller";
import gallerySchema from "../../schemas/gallery.schema";

const galleryRouter = Router();

galleryRouter.route(`/`)
    .get([sessionMiddleware.check], galleryController.get)
    .post([sessionMiddleware.check], galleryController.add)
    .delete([requestMiddleware.check(gallerySchema.delete), sessionMiddleware.check, permissionMiddleware.check], galleryController.delete)

export default galleryRouter;