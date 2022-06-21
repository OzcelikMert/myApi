import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V, {ClearTypes} from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {DataCommonDocument} from "../../modules/services";

type DataDocument = {
    id: number
} & DataCommonDocument

class Setting {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data);
    }

    private get() {
        this.result.data = DBFunctions.Select.Settings(this.data);
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

export default Setting;