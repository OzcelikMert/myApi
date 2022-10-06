import {SessionDataDocument} from "../session";

interface ConfigDocument {
    app: any
    passwordSalt: string
    publicFolders: string[][]
    activeUsers: {_id: string, startDate: Date, lastDate: Date}[]
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
