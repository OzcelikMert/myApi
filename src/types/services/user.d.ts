import mongoose from "mongoose";

export interface SelectUserParamDocument {
    userId?: mongoose.Types.ObjectId
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

export interface UpdateUserParamDocument {
    userId: mongoose.Types.ObjectId
    roleId?: number
    statusId?: number
    image?: string
    name?: string
    comment?: string
    phone?: string
    email?: string
    password?: string
    banDateEnd?: Date
    banComment?: string
    facebook?: string
    instagram?: string
    twitter?: string
    permissionId?: number[]
}

export interface UserDocument {
    roleId: number,
    statusId: number,
    image: string,
    name: string,
    comment: string,
    phone: string,
    email: string,
    password: string,
    permissions: number[],
    banDateEnd: Date,
    banComment: string,
    facebook: string,
    instagram: string,
    twitter: string,
    views: number,
}