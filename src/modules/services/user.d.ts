export default interface UserDocument {
    userId: number,
    userRoleId: number,
    userStatusId: number,
    userImage: string
    userName: string
    userComment: string
    userPhone: string
    userEmail: string
    userPassword: string
    userPermissions: string
    userBanDateEnd: string
    userBanComment: string
    userFacebook: string
    userInstagram: string
    userTwitter: string
}

export interface UpdateUserParamDocument {
    userId: number
    roleId?: number
    statusId?: number
    image?: string
    name?: string
    comment?: string
    phone?: string
    email?: string
    password?: string
    banDateEnd?: string
    banComment?: string
    facebook?: string
    instagram?: string
    twitter?: string
    permissionId?: number[]
}

export interface SelectUserParamDocument {
    userId?: number
    email?: string,
    password?: string
}

export interface InsertUserParamDocument {
    roleId: number
    statusId: number
    name: string
    email: string
    password: string
    permissionId: number[]
}