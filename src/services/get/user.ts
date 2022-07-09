import DBFunctions from "../../config/db/functions"
import Session from "../../config/session";
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {DataCommonDocument} from "../../modules/services";
import {PostDocument, UserDocument} from "../../modules/ajax/result/data";

type DataDocument = {
    email?: string
    password?: string
    userId?: number
    isCheckSession?: any
    isRefresh?: any
    requestType: "list" | "getSession" | "createSession"
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

    private get() {
        this.result.data = DBFunctions.Select.Users(this.data);
        this.result.data.map((item: UserDocument) => {item.userPermissions = JSON.parse(item.userPermissions)})
    }

    private setSession() {
        if (this.result.data.length > 0) {
            let user: UserDocument = this.result.data[0];
            Session.Functions.set(this.sessionMain, {
                id: user.userId,
                email: user.userEmail,
                roleId: user.userRoleId,
                ip: this.data.ip,
                permission: []
            });
        }
    }

    checkSession() {
        if (V.isEmpty(this.session)) {
            this.result.status = false;
            this.result.errorCode = ErrorCodes.notLoggedIn;
        } else {
            if (this.data.isRefresh == "true") {
                this.data.userId = this.session.id;
                this.get()
            }
        }
    }

    private checkData() {
        this.result.checkErrorCode(
            () => {
                if (
                    this.data.requestType !== "getSession" &&
                    this.data.requestType !== "createSession" &&
                    this.data.requestType !== "list"
                ) return ErrorCodes.incorrectData;

                if (this.data.requestType === "getSession") {
                    if (
                        V.isEmpty(this.data.userId) &&
                        V.isEmpty(this.data.isCheckSession)
                    ) return ErrorCodes.emptyValue;
                }

                if (this.data.requestType === "createSession") {
                    if (
                        V.isEmpty(
                            this.data.email,
                            this.data.password
                        )
                    ) return ErrorCodes.emptyValue;
                }

                if (this.data.requestType === "list" &&
                    (
                        V.isEmpty(this.session) ||
                        this.session.id < 1
                    )
                ) return ErrorCodes.notLoggedIn;
            }
        );
    }

    init(): ServiceResult {
        this.checkData();
        if (this.result.status) {
            switch (this.data.requestType) {
                case "getSession":
                    if (this.data.isCheckSession == "true") {
                        this.checkSession();
                    } else {
                        this.get();
                        this.setSession();
                    }
                    break;
                case "createSession":
                    this.get();
                    this.setSession();
                    break;
                case "list":
                    this.get();
                    break;
            }
        }
        return this.result;
    }
}

export default User;