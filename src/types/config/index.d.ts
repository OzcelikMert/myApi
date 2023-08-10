import {SessionDataDocument} from "../session";

interface OnlineUserDocument {
    ip: string,
    _id: string,
    createdAt: Date,
    updatedAt: Date
}

interface ConfigDocument {
    app: any
    passwordSalt: string
    publicFolders: string[][]
    onlineUsers: OnlineUserDocument[]
    paths: {
        root: string
        uploads: {
            images: string
            flags: string
            video: string
            static: string
        }
    },
    defaultLangId: string
}

export {
    OnlineUserDocument,
    ConfigDocument, SessionDataDocument
}
