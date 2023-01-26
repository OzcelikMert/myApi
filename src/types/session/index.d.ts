import mongoose from "mongoose";
import {UserRoleId} from "../../constants/userRoles";

declare module 'express-session' {
    interface Session {
        data: SessionDataDocument
        __lastAccess: number
    }
}

interface SessionDataDocument {
    id: mongoose.Types.ObjectId | string,
    roleId: UserRoleId,
    email: string,
    ip: string,
    token?: string,
    permission: Array<number>
    createAt: number,
    updatedAt: number
}

export {
    SessionDataDocument
}