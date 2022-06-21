import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V from "../../library/variable"
import {DataCommonDocument} from "../../modules/services";
import fs from "fs";
import path from "path";
import {Config} from "../../config";

type DataDocument = {

} & DataCommonDocument

class Post {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data);

    }

    private get() {
        let fileType = [".jpg", ".png", ".webp", ".gif", ".jpeg"],
            files: string[] = [];
        let images = fs.readdirSync(Config.paths.uploads.images);
        for(let i=0; i < images.length; i++) {
            let image = images[i];
            if(fs.existsSync(Config.paths.uploads.images + image)) {
                if (fileType.includes(path.extname(image)))
                    files.push(image);
            }
        }
        this.result.data = files;
    }

    private checkData(){}

    init(): ServiceResult{
        this.checkData();
        if(this.result.status){
            this.get();
        }
        return this.result;
    }
}

export default Post;