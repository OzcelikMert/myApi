import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {DataCommonDocument} from "../../modules/services";
import {PermissionId, UserRoles} from "../../public/static";
import {SessionController} from "../../controllers";
import {UserDocument} from "../../modules/ajax/result/data";
import {UserFunctions} from "../../public/functions";

type DataDocument = {
    userId: number
    isSignOut?: any
    roleId?: number
    statusId?: number
    image?: string
    name?: string
    comment?: string
    phone?: string
    email?: string
    password?: string
    newPassword?: string,
    permissionId?: number[]
    banDateEnd?: string
    banComment?: string
    facebook?: string,
    instagram?: string,
    twitter?: string
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
        if(!V.isEmpty(this.data.newPassword)) this.data.password = UserFunctions.encodePassword(this.data.newPassword || "");
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
                        this.data.userId
                    )
                ) return ErrorCodes.emptyValue;

                let user: UserDocument[] = DBFunctions.Select.Users({userId: this.data.userId});

                if(
                    user.length === 0
                ) return ErrorCodes.incorrectData;

                if(
                    this.session.id == this.data.userId
                ) {
                    if(
                        !V.isEmpty(this.data.email) ||
                        !V.isEmpty(this.data.roleId) ||
                        !V.isEmpty(this.data.statusId) ||
                        !V.isEmpty(this.data.permissionId) ||
                        !V.isEmpty(this.data.banDateEnd) ||
                        !V.isEmpty(this.data.banComment)
                    ) return ErrorCodes.noPerm;

                    if(
                        !V.isEmpty(this.data.newPassword)
                    ) {
                        if(
                            V.isEmpty(this.data.password)
                        ) return ErrorCodes.emptyValue;

                        if(
                            UserFunctions.encodePassword(this.data.password || "") != user[0].userPassword
                        ) return ErrorCodes.wrongPassword;
                    }
                }

                if(this.session.id != this.data.userId) {
                    if(
                        !SessionController.checkPerm(this.session, PermissionId.UserEdit) &&
                        this.session.id == this.data.userId
                    ) return ErrorCodes.noPerm;

                    if(
                        UserRoles.findSingle("id", this.session.roleId).rank < UserRoles.findSingle("id", user[0].userRoleId).rank
                    ) return ErrorCodes.noPerm;
                }
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