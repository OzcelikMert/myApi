import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V, {ClearTypes} from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {DataCommonDocument} from "../../modules/services";
import {SeoDocument} from "../../modules/ajax/result/data";

type DataDocument = {
    langId: number
} & DataCommonDocument

class Seo {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data);
    }

    private get() {
        this.result.data = DBFunctions.Select.Seo(this.data);
        this.result.data.map((item: SeoDocument) => {item.seoContentTags = JSON.parse(item.seoContentTags)})
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(
                    V.isEmpty(
                        this.data.langId
                    )
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

export default Seo;