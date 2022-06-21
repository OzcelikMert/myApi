import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V, {ClearTypes, DateMask} from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {DataCommonDocument} from "../../modules/services";
import sharp from "sharp";
import multer from "multer";
import {Config} from "../../config";

const fs = require("fs"),
    path = require('path');

type DataDocument = {} & DataCommonDocument

class Gallery {
    public result: ServiceResult = new ServiceResult();
    private readonly req: any;
    private readonly res: any
    private readonly data: DataDocument
    private readonly session: SessionDataDocument;

    constructor(req: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.res = res;
        this.req = req;
        this.data = req.body;
    }

    private upload = multer({
        storage: multer.memoryStorage(),
        fileFilter: (req: any,file: any,cb: any)=> {
            let ext = path.extname(file.originalname)?.replace(".", "");
            let filter = ["jpg", "jpeg", "png", "gif"];
            if(filter.includes(ext)) {
                cb(null,true);
            } else {
                this.result.errorCode = ErrorCodes.uploadError;
                cb('Only Images Are Allow', false);
            }
        }
    }).single("file");

    private set() {
        let self = this;

        function newName() {
            const timestamp = new Date().getStringWithMask(DateMask.UNIFIED_ALL);
            return `${timestamp}-${Math.randomCustom(1, 999999)}.webp`;
        }

        return new Promise(resolve => {
            this.upload(self.req, self.res, async function (err: any) {
                try {
                    let ref = newName();
                    while(fs.existsSync(Config.paths.uploads.images + newName())) {
                        ref = newName();
                    }

                    let data = await sharp(self.req.file.buffer, {animated: true})
                        .webp({quality: 80, force: true, loop: 0})
                        .toBuffer();
                    fs.createWriteStream(Config.paths.uploads.images + ref).write(data);
                } catch (e) {
                    self.result.status = false;
                    self.result.errorCode = ErrorCodes.uploadError;
                } finally {
                    resolve(0);
                }
            });
        })
    }

    private checkData(){}

    init(): Promise<ServiceResult>{
        let self = this;
        return new Promise( (resolve) => {
            this.checkData();
            if (this.result.status) {
                this.set().then(() => {
                    resolve(self.result);
                });
            }else{
                resolve(self.result);
            }
        })
    }
}

export default Gallery;