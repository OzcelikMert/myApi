import {Request, Response} from "express";
import {DateMask} from "../library/variable"
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import {InferType} from "yup";
import fs, {Stats} from "fs";
import {Config} from "../config";
import path from "path";
import sharp from "sharp";
import multer from "multer";
import gallerySchema from "../schemas/gallery.schema";
import logMiddleware from "../middlewares/log.middleware";

function getImageResult(name: string, stats: Stats) {
    return {
        name: name,
        sizeKB: Number(stats.size) / 1024,
        sizeMB: Number(stats.size) / (1024 * 1024),
        createdAt: stats.ctime,
    }
}

export default {
    get: async (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            const fileType = [".jpg", ".png", ".webp", ".gif", ".jpeg"];

            await new Promise(resolve => {
                fs.readdir(Config.paths.uploads.images, async (err, images) => {
                    for(let i=0; i < images.length; i++) {
                        let image = images[i];
                        if(fs.existsSync(path.resolve(Config.paths.uploads.images, image))) {
                            if (fileType.includes(path.extname(image))){
                                let fileStat = fs.statSync(path.resolve(Config.paths.uploads.images, image))
                                serviceResult.data.push(getImageResult(image, fileStat));
                            }
                        }
                    }
                    resolve(0)
                });
            })

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    add: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            function newName() {
                const timestamp = new Date().getStringWithMask(DateMask.UNIFIED_ALL);
                return `${timestamp}-${Math.randomCustom(1, 999999)}.webp`;
            }

            const upload = multer({
                storage: multer.memoryStorage(),
                fileFilter: (req, file, cb: any)=> {
                    let ext = path.extname(file.originalname)?.replace(".", "");
                    let filter = ["jpg", "jpeg", "png", "gif"];
                    if(filter.includes(ext)) {
                        cb(null,true);
                    } else {
                        cb('Only Images Are Allow', false);
                    }
                }
            }).single("file");

            await new Promise(resolve => {
                upload(req, res, async function (err: any) {
                    if(err) {
                        serviceResult.status = false;
                        serviceResult.errorCode = ErrorCodes.uploadError;
                        serviceResult.statusCode = StatusCodes.badRequest;
                    }

                    try {
                        let ref = newName();
                        while(fs.existsSync(path.resolve(Config.paths.uploads.images, newName()))) {
                            ref = newName();
                        }

                        let data = await sharp(req.file?.buffer, {animated: true})
                            .webp({quality: 80, force: true, loop: 0})
                            .toBuffer();

                        await new Promise(resolveCreate => {
                            fs.createWriteStream(path.resolve(Config.paths.uploads.images, ref)).write(data, (error) => {
                                let fileStat = fs.statSync(path.resolve(Config.paths.uploads.images, ref))
                                serviceResult.data.push(getImageResult(ref, fileStat));
                                resolveCreate(0);
                            });
                        })
                    } catch (e) {
                        serviceResult.status = false;
                        serviceResult.errorCode = ErrorCodes.uploadError;
                        serviceResult.statusCode = StatusCodes.badRequest;
                    } finally {
                        resolve(0);
                    }
                });
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
    delete: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof gallerySchema.delete> = req;

            await new Promise(resolve => {
                data.body.images?.forEach(image => {
                    if (fs.existsSync(path.resolve(Config.paths.uploads.images, image))) {
                        fs.unlinkSync(path.resolve(Config.paths.uploads.images, image));
                        fs.close(0);
                        serviceResult.data.push(image);
                    }
                })
                resolve(0);
            });

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};