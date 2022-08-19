import {Request, Response} from "express";
import V, {DateMask} from "../library/variable"
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import {InferType} from "yup";
import fs from "fs";
import {Config} from "../config";
import path from "path";
import sharp from "sharp";
import multer from "multer";
import gallerySchema from "../schemas/gallery.schema";

export default {
    get: (
        req: Request<any, any,any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        const fileType = [".jpg", ".png", ".webp", ".gif", ".jpeg"];
        const images = fs.readdirSync(Config.paths.uploads.images);
        for(let i=0; i < images.length; i++) {
            let image = images[i];
            if(fs.existsSync(Config.paths.uploads.images + image)) {
                if (fileType.includes(path.extname(image))){
                    serviceResult.data.push(image)
                }
            }
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
    add: async (
        req: Request,
        res: Response
    ) => {
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
                    while(fs.existsSync(Config.paths.uploads.images + newName())) {
                        ref = newName();
                    }

                    let data = await sharp(req.file?.buffer, {animated: true})
                        .webp({quality: 80, force: true, loop: 0})
                        .toBuffer();
                    fs.createWriteStream(Config.paths.uploads.images + ref).write(data);
                    serviceResult.data.push(ref);
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
    },
    delete: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof gallerySchema.delete> = req;

        await new Promise(resolve => {
            data.body.images?.forEach(image => {
                if (fs.existsSync(Config.paths.uploads.images + image)) {
                    fs.unlinkSync(Config.paths.uploads.images + image);
                    fs.close(0);
                    serviceResult.data.push(image);
                }
            })
            resolve(0);
        });

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};