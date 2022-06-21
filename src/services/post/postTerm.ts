import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V, {ClearTypes} from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {SessionController} from "../../controllers";
import {Permissions, PermissionId} from "../../public/static";
import {DataCommonDocument} from "../../modules/services";

type DataDocument = {
    typeId: number,
    postTypeId: number,
    langId: number,
    title: string,
    order: number,
    termId?: number,
    mainId?: number,
    statusId: number
    url?: string,
    seoTitle?: string,
    seoContent?: string,
    isFixed?: number | any,
} & DataCommonDocument

class PostTerm {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data);
    }

    private set() {
        this.data.url = (V.isEmpty(this.data.url)) ? V.clear(this.data.title, ClearTypes.SEO_URL) : this.data.url;
        this.data.termId = DBFunctions.Insert.PostTerm(this.data).insertId;
        DBFunctions.Insert.PostTermContent(this.data);
    }

    private checkData(){
        console.log(this.data);
        this.result.checkErrorCode(
            () => {
                if(
                    V.isEmpty(
                        this.data.title,
                        this.data.order,
                        this.data.typeId,
                        this.data.langId,
                        this.data.postTypeId,
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

export default PostTerm;