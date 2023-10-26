import {UserRoleId} from "../../constants/userRoles";

export interface SessionAuthDocument{
    _id?: string
    userId: string
    roleId: UserRoleId,
    email: string,
    ip: string,
    token?: string,
    permissions: number[]
    createAt?: string,
    updatedAt?: string
}