import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {DataCommonDocument} from "../../modules/services";
import {PermissionId, UserRoles} from "../../public/static";
import {SessionController} from "../../controllers";

type DataDocument = {
    roleId: number
    statusId: number
    image: string
    name: string
    email: string
    password: string
    permissionId: number[]
    banDateEnd: string
    banComment: string
} & DataCommonDocument

class User {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data);
    }

    private set() {
        DBFunctions.Insert.User(this.data);
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(
                    V.isEmpty(
                        this.data.email,
                        this.data.password,
                        this.data.name,
                        this.data.roleId,
                        this.data.statusId
                    )
                ) return ErrorCodes.emptyValue;

                if(
                    !SessionController.checkPerm(this.session, PermissionId.UserAdd)
                ) return ErrorCodes.noPerm;

                if(
                    UserRoles.findSingle("id", this.session.roleId).rank < UserRoles.findSingle("id", this.data.roleId).rank
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

export default User;