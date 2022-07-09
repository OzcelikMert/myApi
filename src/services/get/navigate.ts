import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {DataCommonDocument} from "../../modules/services";

type DataDocument = {
    navigateId?: number
    langId: number
    getContents?: boolean
    statusId?: number
} & DataCommonDocument

class Navigate {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data);
    }

    private get() {
        this.result.data = DBFunctions.Select.Navigates(this.data);
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

export default Navigate;