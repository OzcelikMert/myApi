import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {DataCommonDocument} from "../../modules/services";
import {PostDocument} from "../../modules/ajax/result/data";

type DataDocument = {
    postId?: number
    typeId: number
    langId: number
    getContents?: boolean
    statusId?: number
    maxCount?: number
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
        this.result.data = DBFunctions.Select.Posts(this.data);
        this.result.data.map((item: PostDocument) => {item.postTermContents = JSON.parse(item.postTermContents)})
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(
                    V.isEmpty(this.data.langId)
                ) return ErrorCodes.emptyValue;
            }
        );
    }

    init(): ServiceResult{
        this.checkData();
        if(this.result.status){
            this.get();
        }
        return this.result;
    }
}

export default Post;