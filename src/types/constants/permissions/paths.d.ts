import {PermissionId} from "../../../constants/permission.const";

interface PermissionPathDocument {
    [key: string]: PermissionPathDataDocument
}

export interface PermissionPathDataDocument {
    get?: PermissionId
    post?: PermissionId
    put?: PermissionId
    delete?: PermissionId
}

export default PermissionPathDocument