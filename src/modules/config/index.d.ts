import {SessionDataDocument, SessionDocument} from "./session";

interface ConfigDocument {
    app: any
    passwordSalt: string
    publicFolders: string[][]
    activeUsers: any[]
    paths: {
        root: string
        services: string
        uploads: {
            images: string
        }
    }
}

export {
    ConfigDocument,
    SessionDocument, SessionDataDocument
}
