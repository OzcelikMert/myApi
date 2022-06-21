interface SessionDocument {
    data: SessionDataDocument,
    destroy: Function,
    save: Function
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
    SessionDocument,
    SessionDataDocument
}