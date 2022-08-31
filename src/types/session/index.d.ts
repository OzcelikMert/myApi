import mongoose from "mongoose";

declare module 'express-session' {
    interface Session {
        data: SessionDataDocument
    }
}

interface SessionDataDocument {
    id: mongoose.Types.ObjectId,
    roleId: number,
    email: string,
    ip: string,
    token?: string,
    permission: Array<number>
}

export {
    SessionDataDocument
}