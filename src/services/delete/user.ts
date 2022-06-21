import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {DataCommonDocument} from "../../modules/services";
import {PermissionId, StatusId, UserRoles} from "../../public/static";
import {SessionController} from "../../controllers";
import {UserDocument} from "../../modules/ajax/result/data";

type DataDocument = {
    userId: number
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
        DBFunctions.Update.User({
            userId: this.data.userId,
            statusId: StatusId.Deleted
        });
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(
                    V.isEmpty(
                        this.data.userId
                    )
                ) return ErrorCodes.emptyValue;

                if(
                    !SessionController.checkPerm(this.session, PermissionId.UserDelete)
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
            this.set();
        }
        return this.result;
    }
}

export default User;