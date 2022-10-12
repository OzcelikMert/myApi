import {SessionDataDocument} from "../session";

interface ConfigDocument {
    app: any
    passwordSalt: string
    publicFolders: string[][]
    onlineUsers: {ip: string, _id: string, createdAt: Date, updatedAt: Date}[]
    paths: {
        root: string
        services: string
        uploads: {
            images: string
        }
    }
}

export {
    ConfigDocument, SessionDataDocument
}
