declare module 'express-session' {
    interface Session {
        data: SessionDataDocument
    }
}

interface SessionDataDocument {
    id: number,
    roleId: number,
    email: string,
    ip: string,
    token?: string,
    permission: Array<number>
}

export {
    SessionDataDocument
}