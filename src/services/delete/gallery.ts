import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V from "../../library/variable"
import {DataCommonDocument} from "../../modules/services";
import fs from "fs";
import {Config} from "../../config";
import ErrorCodes from "../../public/ajax/errorCodes";
import {SessionController} from "../../controllers";
import {PermissionId} from "../../public/static";

type DataDocument = {
    images?: string[]
    videos?: string[]
} & DataCommonDocument

class Post {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(req: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(req.body);
    }

    private set() {
        return new Promise(resolve => {
            this.data.images?.forEach(image => {
                if (fs.existsSync(Config.paths.uploads.images + image)) {
                    fs.unlinkSync(Config.paths.uploads.images + image);
                    fs.close(0);
                }
            })
            resolve(0);
        });
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(
                    V.isEmpty(this.data.images) &&
                    V.isEmpty(this.data.videos)
                ) return ErrorCodes.emptyValue;

                if(
                    !SessionController.checkPerm(this.session, PermissionId.GalleryEdit)
                ) return ErrorCodes.noPerm;
            }
        );
    }

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

export default Post;