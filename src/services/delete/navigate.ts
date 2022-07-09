import DBFunctions from "../../config/db/functions"
import {ServiceResult} from "../";
import V, {ClearTypes} from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {SessionController} from "../../controllers";
import {Permissions, PermissionId} from "../../public/static";
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {DataCommonDocument} from "../../modules/services";

type DataDocument = {
    navigateId: number | number[]
} & DataCommonDocument

class Navigate {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data);
    }

    private set(navigateId = 0) {
        DBFunctions.Delete.Navigate(Object.assign(this.data, {navigateId: navigateId}));
        DBFunctions.Delete.NavigateContent(Object.assign(this.data, {navigateId: navigateId}));
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(V.isEmpty(this.data.navigateId)) return ErrorCodes.emptyValue;

                if(
                    !SessionController.checkPerm(this.session, PermissionId.NavigateDelete)
                ) return ErrorCodes.noPerm;
            }
        );
    }

    init(): ServiceResult{
        this.checkData();
        if(this.result.status){
            if(Array.isArray(this.data.navigateId)){
                this.data.navigateId.forEach(navigateId => {
                    this.set(navigateId);
                })
            }else{
                this.set(this.data.navigateId);
            }
        }
        return this.result;
    }
}

export default Navigate;