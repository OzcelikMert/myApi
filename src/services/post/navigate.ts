import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V, {ClearTypes} from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {SessionController} from "../../controllers";
import {Permissions, PermissionId} from "../../public/static";
import {DataCommonDocument} from "../../modules/services";

type DataDocument = {
    navigateId: number,
    langId: number,
    title: string,
    order: number,
    mainId: number,
    statusId: number
    url: string,
} & DataCommonDocument

class Navigate {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data);
    }

    private set() {
        this.data.navigateId = DBFunctions.Insert.Navigate(this.data).insertId;
        DBFunctions.Insert.NavigateContent(this.data);
    }

    private checkData(){
        console.log(this.data);
        this.result.checkErrorCode(
            () => {
                if(
                    V.isEmpty(
                        this.data.title,
                        this.data.url,
                        this.data.order,
                        this.data.langId,
                        this.data.statusId
                    )
                ) return ErrorCodes.emptyValue;

                if(
                    !SessionController.checkPerm(this.session, PermissionId.NavigateAdd)
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

export default Navigate;