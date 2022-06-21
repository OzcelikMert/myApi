import {UserRoles, Permissions, UserRoleId} from "../public/static/";
import {SessionDataDocument} from "../modules/config";

const SessionController = {
    isThere(req: any): Boolean {
        return typeof req.session !== "undefined";
    },
    checkPerm(
        session: SessionDataDocument,
        id: number = 0
    ) : boolean{
        return SessionController.isAdmin(session) || session.permission.indexOfKey("", id) > -1;
    },
    isAdmin(session: SessionDataDocument) : boolean{
        return session.roleId === UserRoleId.Admin;
    }
}

export default SessionController;