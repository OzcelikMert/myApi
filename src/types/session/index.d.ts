import mongoose from "mongoose";

declare module 'express-session' {
    interface Session {
        data: SessionDataDocument
        __lastAccess: number
    }
}

interface SessionDataDocument {
    id: mongoose.Types.ObjectId,
    roleId: number,
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