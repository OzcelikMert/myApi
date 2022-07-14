import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V, {ClearTypes} from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {SessionController} from "../../controllers";
import {Permissions, PermissionId, SeoTitleSeparators} from "../../public/static";
import {DataCommonDocument} from "../../modules/services";

type DataDocument = {
    langId: number
    title: string
    content: string
    tags: string[]
    separatorId: number
} & DataCommonDocument

class Seo {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data);
    }

    private set() {
        if(DBFunctions.Select.Seo(this.data).length > 0) {
            DBFunctions.Update.Seo(this.data);
        }else {
            DBFunctions.Insert.Seo(this.data);
        }
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(
                    V.isEmpty(
                        this.data.langId,
                        this.data.separatorId
                    )
                ) return ErrorCodes.emptyValue;

                if(
                    SeoTitleSeparators.indexOfKey("id", this.data.separatorId) === -1
                ) return ErrorCodes.emptyValue;

                if(
                    !SessionController.isAdmin(this.session)
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

export default Seo;