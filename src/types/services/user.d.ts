import mongoose from "mongoose";

export interface SelectUserParamDocument {
    userId?: mongoose.Types.ObjectId
    statusId?: number
    email?: string,
    password?: string,
    url?: string,
    maxCount?: number,
    ignoreUserId?: mongoose.Types.ObjectId[]
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

export type SelectUserResultDocument = {} & UserDocument

export interface PopulateAuthorIdDocument {
    _id: mongoose.Types.ObjectId,
    name: string,
    email: string,
    url: string
}

export interface UserDocument {
    _id: mongoose.Types.ObjectId
    roleId: number,
    statusId: number,
    image: string,
    name: string,
    url: string,
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