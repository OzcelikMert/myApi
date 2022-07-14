import DBFunctions from "../../config/db/functions"
import {ServiceResult} from "../";
import V, {ClearTypes} from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {SessionController} from "../../controllers";
import {Permissions, PermissionId} from "../../public/static";
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {DataCommonDocument} from "../../modules/services";

type DataDocument = {
    navigateId: number | number[],
    statusId: number,
    langId: number,
    title: string,
    order: number,
    mainId: number,
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

    private set(navigateId = 0) {
        let params = Object.assign(this.data, {navigateId: navigateId});
        DBFunctions.Update.Navigate(params);
        if(this.data.langId) {
            DBFunctions.Select.Navigates(params).forEach(navigate => {
                if(navigate.navigateContentLangId){
                    DBFunctions.Update.NavigateContent(params);
                }else {
                    DBFunctions.Insert.NavigateContent(params);
                }
            })
        }
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(V.isEmpty(
                    this.data.navigateId,
                    this.data.statusId,
                )) return ErrorCodes.emptyValue;

                if(
                    !V.isEmpty(this.data.langId) &&
                    V.isEmpty(
                        this.data.title,
                        this.data.url,
                        this.data.order,
                        this.data.langId,
                        this.data.statusId
                    )
                ) return ErrorCodes.emptyValue;

                if(
                    !SessionController.checkPerm(this.session, PermissionId.NavigateEdit)
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