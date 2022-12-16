import mongoose from "mongoose";

export interface SelectUserParamDocument {
    userId?: string
    statusId?: number
    email?: string,
    password?: string,
    url?: string,
    maxCount?: number,
    roleId?: number
    ignoreUserId?: string[]
}

export interface InsertUserParamDocument {
    roleId: number
    statusId: number
    name: string
    email: string
    password: string
    permissions?: number[]
}

export interface UpdateUserParamDocument {
    userId?: string
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
    permissions?: number[]
}

export type SelectUserResultDocument = {
    isOnline?: boolean
} & UserDocument

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
    password?: string,
    permissions: number[],
    banDateEnd: Date,
    banComment: string,
    facebook: string,
    instagram: string,
    twitter: string,
    views: number,
}