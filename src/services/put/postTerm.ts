import DBFunctions from "../../config/db/functions"
import {ServiceResult} from "../";
import V, {ClearTypes} from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {SessionController} from "../../controllers";
import {Permissions, PermissionId} from "../../public/static";
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {DataCommonDocument} from "../../modules/services";

type DataDocument = {
    termId: number | number[],
    statusId: number,
    langId?: number,
    title?: string,
    order?: number,
    mainId?: number,
    image?: string
    url?: string,
    seoTitle?: string,
    seoContent?: string,
    isFixed?: number,
} & DataCommonDocument

class PostTerm {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data);
    }

    private set(termId = 0) {
        this.data.url = (V.isEmpty(this.data.url)) ? V.clear(this.data.title, ClearTypes.SEO_URL) : this.data.url;
        DBFunctions.Update.PostTerm(Object.assign(this.data, {termId: termId}));
        if(!V.isEmpty(this.data.langId)) DBFunctions.Update.PostTermContent(Object.assign(this.data, {termId: termId}));
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(V.isEmpty(
                    this.data.termId,
                    this.data.statusId,
                )) return ErrorCodes.emptyValue;

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
            if(Array.isArray(this.data.termId)){
                this.data.termId.forEach(termId => {
                    this.set(termId);
                })
            }else{
                this.set(this.data.termId);
            }
        }
        return this.result;
    }
}

export default PostTerm;