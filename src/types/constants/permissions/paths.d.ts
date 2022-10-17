import {PermissionId} from "../../../constants/permissions";

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