import {SessionDataDocument} from "../session";

interface ConfigDocument {
    app: any
    passwordSalt: string
    publicFolders: string[][]
    onlineUsers: {ip: string, _id: string, createdAt: Date, updatedAt: Date}[]
    paths: {
        root: string
        uploads: {
            images: string
        }
    },
    url: {
        server: string
        sitemaps: string
    }
    defaultLangId: string
}

export {
    ConfigDocument, SessionDataDocument
}
