interface UpdateUserParamDocument {
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

export default UpdateUserParamDocument;