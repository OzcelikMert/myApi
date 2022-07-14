import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V, {ClearTypes} from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {SessionController} from "../../controllers";
import {Permissions, PermissionId} from "../../public/static";
import {DataCommonDocument} from "../../modules/services";

type DataDocument = {
    postId: number
    typeId: number
    statusId: number
    order: number
    authorId: number
    isFixed: 1 | 0
    dateStart: string
    langId: number
    image: string
    title: string
    shortContent: string
    content: string
    url: string
    seoTitle: string
    seoContent: string
    termId: number[]
} & DataCommonDocument

class Post {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data, ["content"]);
    }

    private set() {
        this.data.authorId = this.session.id;
        this.data.url = (V.isEmpty(this.data.url)) ? V.clear(this.data.title, ClearTypes.SEO_URL) : this.data.url;
        this.data.postId = DBFunctions.Insert.Post(this.data).insertId;
        DBFunctions.Insert.PostContent(this.data);
        DBFunctions.Delete.PostTermLinks(this.data);
        if(!V.isEmpty(this.data.termId)) {
            this.data.termId?.forEach(termId => {
                DBFunctions.Insert.PostTermLinks({
                    postId: this.data.postId,
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
                        this.data.title,
                        this.data.order,
                        this.data.typeId,
                        this.data.langId,
                        this.data.dateStart,
                        this.data.statusId
                    )
                ) return ErrorCodes.emptyValue;

                if(
                    !SessionController.checkPerm(this.session, PermissionId.BlogAdd) &&
                    !SessionController.checkPerm(this.session, PermissionId.PortfolioAdd)
                ) return ErrorCodes.noPerm;
            }
        );
    }

    init(): ServiceResult{
        this.checkData();
        if(this.result.status){
            this.set();
        }
        return this.result;
    }
}

export default Post;