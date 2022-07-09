import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {DataCommonDocument} from "../../modules/services";
import {PermissionId, UserRoles} from "../../public/static";
import {SessionController} from "../../controllers";
import {UserDocument} from "../../modules/ajax/result/data";

type DataDocument = {
    userId: number
    isSignOut?: any
    roleId?: number
    statusId?: number
    image?: string
    name?: string
    email?: string
    password?: string
    permissionId?: number[]
    banDateEnd?: string
    banComment?: string
} & DataCommonDocument

class User {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;
    private readonly sessionMain: SessionDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.sessionMain = session;
        this.session = session.data;
        this.data = V.clearAllData(data);
    }

    private set() {
        DBFunctions.Update.User(this.data);
    }

    private deleteSession() {
        this.sessionMain.destroy();
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(
                    V.isEmpty(this.data.isSignOut) &&
                    V.isEmpty(
                        this.data.userId,
                        this.data.statusId
                    )
                ) return ErrorCodes.emptyValue;

                if(
                    !SessionController.checkPerm(this.session, PermissionId.UserEdit)
                ) return ErrorCodes.noPerm;

                let user: UserDocument[] = DBFunctions.Select.Users({userId: this.data.userId});

                if(
                    user.length === 0
                ) return ErrorCodes.incorrectData;

                if(
                    UserRoles.findSingle("id", this.session.roleId).rank < UserRoles.findSingle("id", user[0].userRoleId).rank
                ) return ErrorCodes.noPerm;
            }
        );
    }

    init(): ServiceResult{
        this.checkData();
        if(this.result.status){
            if (this.data.isSignOut == "true") {
                this.deleteSession();
            }else {
                this.set();
            }

        }
        return this.result;
    }
}

export default User;