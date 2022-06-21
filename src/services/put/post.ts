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
    statusId: number
    order: number
    isFixed?: 1 | 0
    dateStart: string
    langId: number
    title: string
    shortContent?: string
    content?: string
    url?: string
    seoTitle?: string
    seoContent?: string
    termId?: number[]
} & DataCommonDocument

class Post {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data, ["content"]);
    }

    private set(postId = 0) {
        this.data.url = (V.isEmpty(this.data.url)) ? V.clear(this.data.title, ClearTypes.SEO_URL) : this.data.url;
        DBFunctions.Update.Post(Object.assign(this.data, {postId: postId}));
        if(!V.isEmpty(this.data.langId)) DBFunctions.Update.PostContent(Object.assign(this.data, {postId: postId}));
        if(!V.isEmpty(this.data.termId)) {
            DBFunctions.Delete.PostTermLinks({postId: postId});
            this.data.termId?.forEach(termId => {
                DBFunctions.Insert.PostTermLinks({
                    postId: postId,
                    termId: termId
                });
            })
        }
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(
                    V.isEmpty(
                        this.data.postId,
                        this.data.statusId
                    )
                ) return ErrorCodes.emptyValue;

                if(
                    !SessionController.checkPerm(this.session, PermissionId.BlogEdit) &&
                    !SessionController.checkPerm(this.session, PermissionId.PortfolioEdit)
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