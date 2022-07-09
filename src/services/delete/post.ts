import DBFunctions from "../../config/db/functions"
import {ServiceResult} from "../";
import V, {ClearTypes} from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {SessionController} from "../../controllers";
import {Permissions, PermissionId} from "../../public/static";
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {DataCommonDocument} from "../../modules/services";

type DataDocument = {
    postId: number | number[]
} & DataCommonDocument

class Post {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data);
    }

    private set(postId = 0) {
        DBFunctions.Delete.Post(Object.assign(this.data, {postId: postId}));
        DBFunctions.Delete.PostContent(Object.assign(this.data, {postId: postId}));
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(V.isEmpty(this.data.postId)) return ErrorCodes.emptyValue;

                if(
                    !SessionController.checkPerm(this.session, PermissionId.BlogDelete) &&
                    !SessionController.checkPerm(this.session, PermissionId.PortfolioDelete)
                ) return ErrorCodes.noPerm;
            }
        );
    }

    init(): ServiceResult{
        this.checkData();
        if(this.result.status){
            if(Array.isArray(this.data.postId)){
                this.data.postId.forEach(postId => {
                    this.set(postId);
                })
            }else{
                this.set(this.data.postId);
            }
        }
        return this.result;
    }
}

export default Post;