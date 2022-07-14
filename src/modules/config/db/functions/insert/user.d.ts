interface InsertUserParamDocument {
    roleId: number
    statusId: number
    image: string
    name: string
    email: string
    password: string
    banDateEnd: string
    banComment: string
    permissionId: number[]
}

export default InsertUserParamDocument;